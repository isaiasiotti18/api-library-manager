import { ConsultarUsuarioPorEmailService } from './../usuario/services/consultar-usuario-por-email.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuario/model/usuario.model';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly consultarUsuarioPorEmailService: ConsultarUsuarioPorEmailService,
    private readonly jwtService: JwtService,
  ) {}

  login(usuario: Usuario): UserToken {
    // Transforma o usuario em JWT
    const payload: UserPayload = {
      sub: usuario.id,
      email: usuario.email,
      name: usuario.nome,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const usuario = await this.consultarUsuarioPorEmailService.execute(email);

    if (usuario) {
      // checar se a senha informada corresponde a hash que está no banco
      const isPasswordValid = await bcrypt.compare(password, usuario.password);

      if (isPasswordValid) {
        return {
          ...usuario,
          password: undefined,
        };
      }
    }

    // Se chegar aqui, significa que não encontrou um user e/ou a senha não corresponde
    throw new Error('Email address or password provided is incorrect.');
  }
}
