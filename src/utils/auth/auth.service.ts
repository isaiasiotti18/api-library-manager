import { ConsultarUsuarioPorIdService } from 'src/modules/usuario/services/consultar-usuario-porId.service';
import { ConsultarUsuarioPorEmailService } from 'src/modules/usuario/services/consultar-usuario-por-email.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Usuario } from 'src/modules/usuario/model/usuario.model';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { StatusAcesso } from 'src/modules/usuario/enums/status_acesso.enum';
import { ConsultarUsuarioBloqueadoService } from 'src/modules/usuario/services/consultar-usuario-bloqueado.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly consultarUsuarioPorEmailService: ConsultarUsuarioPorEmailService,
    private readonly jwtService: JwtService,
    private readonly consultarUsuarioPorIdService: ConsultarUsuarioPorIdService,
    private readonly consultarUsuarioBloqueadoService: ConsultarUsuarioBloqueadoService,
  ) {}

  async login(usuario: Usuario): Promise<UserToken> {
    // Transforma o usuario em JWT
    const payload: UserPayload = {
      sub: usuario.id,
      email: usuario.email,
      name: usuario.nome,
      role: usuario.role,
    };

    const verificaStatusAcessoUsuario =
      await this.consultarUsuarioBloqueadoService.execute(usuario.id);

    if (verificaStatusAcessoUsuario?.bloqueado) {
      throw new BadRequestException(
        'Usuario BLOQUEADO. Contate o Administrador ou Suporte.',
      );
    }

    const jwtToken = this.jwtService.sign(payload);

    return {
      TOKEN: jwtToken,
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
