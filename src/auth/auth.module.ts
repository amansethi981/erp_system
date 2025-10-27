import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: "myjwtsecret",
      signOptions: { expiresIn: 3600},
    }),
  ],
  providers:[AuthService,JwtStrategy],
  controllers: [AuthController],
   exports:[AuthService, JwtStrategy, PassportModule]
})
export class AuthModule {}
