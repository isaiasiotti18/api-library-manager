import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwt } from '../interfaces/UserFromJwt';
import { PayloadUsuario } from '../interfaces/PayloadUsuario';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: PayloadUsuario): Promise<UserFromJwt> {
    return {
      id: payload.sub,
      email: payload.email,
      nome: payload.nome,
    };
  }
}
