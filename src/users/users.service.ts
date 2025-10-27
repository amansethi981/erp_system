import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findByEmail(email: string) {
    return this.userRepo.findOne({
      where: { email },
      relations: ['role', 'company'],
    });
  }

   async findById(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['company', 'role'], // include related entities
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    //remove sensitive data before returning
    const { password, ...result } = user;
    return result;
  }

  async createUser(currentUser, dto:CreateUserDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({
      ...dto,
      password: hashed,
      company:  currentUser.companyId ,
       role: { id: dto.role_id },
      created_by: currentUser.id,
    });
    // console.log("user",user);
    // console.log("dto",dto);
    return this.userRepo.save(user);
  }

  async getCompanyUsers(companyId: number, page = 1, limit = 10) {
    return this.userRepo.find({
      where: { company: { id: companyId }, is_deleted: false },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['role'],
    });
  }
  
}
