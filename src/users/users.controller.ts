import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Res() res, @Body() dto) {
    try {
      // console.log(req.user)
      const users = await this.usersService.createUser(req.user, dto);
      // console.log("users",users);
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'User created successfully',
        data: users,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to create user',
        error: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Req() req,
    @Res() res,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    try {
      const user = await this.usersService.getCompanyUsers(
        req.user.companyId,
        +page,
        +limit,
      );
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'User reterived successfully',
        data: user,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to reterived user',
        error: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req) {
    return this.usersService.findById(req.user.id);
  }
}
