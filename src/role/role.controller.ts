import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';

@Controller('roles')
export class RoleController {
  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) {}

  @Get()
  async getRoles() {
    return this.roleRepo.find();
  }
}