import { UsuarioRepository } from './../usuario.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BloquearUsuarioService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(usuario_id: string): Promise<void> {
    await this.usuarioRepository.bloquearUsuario(usuario_id);
  }
}
