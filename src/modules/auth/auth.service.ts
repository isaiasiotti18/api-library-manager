import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../usuario/model/usuario.model';
import { UsuarioService } from '../usuario/usuario.service';
import { PayloadUsuario } from './interfaces/PayloadUsuario';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usuarioService: UsuarioService,
  ) {}

  login(usuario: Usuario) {
    const payload: PayloadUsuario = {
      sub: usuario.id,
      email: usuario.email,
      nome: usuario.nome,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validarUsuario(email: string, senha: string) {
    const usuario = await this.usuarioService.consultarUsuarioPorEmail(email);

    if (usuario) {
      const isPasswordValid = await bcrypt.compare(senha, usuario.senha_hash);

      if (isPasswordValid) {
        return {
          ...usuario,
          senha: undefined,
        };
      }
    }

    throw new BadRequestException('Email ou Senha incorretos.');
  }
}
