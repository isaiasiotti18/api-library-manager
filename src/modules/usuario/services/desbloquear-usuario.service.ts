import { ConsultarUsuarioPorIdService } from 'src/modules/usuario/services/consultar-usuario-porId.service';
import { UsuarioRepository } from './../usuario.repository';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class DesbloquearUsuarioService {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly consultarUsuarioPorId: ConsultarUsuarioPorIdService,
  ) {}

  async execute(usuario_id: string): Promise<void> {
    try {
      const usuario = await this.consultarUsuarioPorId.execute(usuario_id);

      if (usuario) {
        await this.usuarioRepository.desbloquearUsuario(usuario.id);
      }
    } catch (error: any) {
      throw new BadRequestException(error?.message);
    }
  }
}
