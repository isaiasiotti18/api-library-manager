import { UsuarioRepository } from './../usuario.repository';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class BloquearUsuarioService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(usuario_id: string): Promise<void> {
    try {
      const usuario = await this.usuarioRepository.consultarUsuarioPorId(
        usuario_id,
      );

      if (usuario) {
        await this.usuarioRepository.bloquearUsuario(usuario.id);
      } else {
        throw new NotFoundException('Usuário não encontrado.');
      }
    } catch (error: any) {
      throw new BadRequestException(error?.message);
    }
  }
}
