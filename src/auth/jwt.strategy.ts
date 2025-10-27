import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "myjwtsecret",
    });
  }

  async validate(payload: any) {
    return {
      id: payload.userId,
      companyId: payload.companyId,
      roleId: payload.roleId,
    };
  }
}
