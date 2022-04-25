import { ConsultarUsuarioPorIdService } from './../usuario/services/consultar-usuario-porId.service';
import { ConsultarUsuarioPorEmailService } from './../usuario/services/consultar-usuario-por-email.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuario/model/usuario.model';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { StatusAcesso } from '../usuario/enums/status_acesso.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly consultarUsuarioPorEmailService: ConsultarUsuarioPorEmailService,
    private readonly jwtService: JwtService,
    private readonly consultarUsuarioPorIdService: ConsultarUsuarioPorIdService,
  ) {}

  async login(usuario: Usuario): Promise<UserToken> {
    // Transforma o usuario em JWT
    const payload: UserPayload = {
      sub: usuario.id,
      email: usuario.email,
      name: usuario.nome,
    };

    const consultarUsuario = await this.consultarUsuarioPorIdService.execute(
      usuario.id,
    );

    if (consultarUsuario.status_acesso === StatusAcesso.BLOQUEADO) {
      throw new BadRequestException(
        'Usuario BLOQUEADO. Contate um Administrador ou Suporte.',
      );
    }

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
