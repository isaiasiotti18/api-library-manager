import { UsuarioRepository } from './../usuario.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Usuario } from '../model/usuario.model';

@Injectable()
export class ConsultarUsuarioPorIdService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(id_usuario: string): Promise<Usuario> {
    const usuarioEncontrado =
      await this.usuarioRepository.consultarUsuarioPorId(id_usuario);

    if (!usuarioEncontrado) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return usuarioEncontrado;
  }
}
