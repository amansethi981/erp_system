import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

import { RoleService } from './role/role.service';
import { RoleController } from './role/role.controller';
import { RoleModule } from './role/role.module';
import { CompanyModule } from './company/company.module';
import { Connection } from 'ormconfig';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
     ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    Connection,
    AuthModule,
    UsersModule,
    RoleModule,
    // CompanyModule,
  ],
  // controllers: [AppController, UsersController, RoleController],
  // providers: [AppService, AuthService, RoleService],
})
export class AppModule {}
