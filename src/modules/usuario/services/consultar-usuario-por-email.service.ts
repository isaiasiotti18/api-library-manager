import { UsuarioRepository } from './../usuario.repository';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ConsultarUsuarioPorEmailService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(email: string) {
    if (email?.length !== 0) {
      const consultaEmail =
        await this.usuarioRepository.consultarUsuarioPorEmail(email);

      if (consultaEmail) return consultaEmail;
    }

    return undefined;
  }
}
