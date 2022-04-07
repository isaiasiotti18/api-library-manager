import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRepository } from '../usuario.repository';
import { AlterarUsuarioDTO } from './../dtos/alterar-usuario.dto';
import { ConsultarUsuarioPorIdService } from './consultar-usuario-porId.service';

@Injectable()
export class AlterarUsuarioService {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly consultarUsuarioPorIdService: ConsultarUsuarioPorIdService,
  ) {}

  async execute(
    id_usuario: string,
    alterarUsuarioDTO: AlterarUsuarioDTO,
  ): Promise<void> {
    try {
      const usuarioJaCadastrado =
        await this.consultarUsuarioPorIdService.execute(id_usuario);

      if (usuarioJaCadastrado) {
        await this.usuarioRepository.alterarUsuario(
          id_usuario,
          alterarUsuarioDTO,
        );
      }
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
