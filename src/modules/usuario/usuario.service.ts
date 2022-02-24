import { Injectable, Logger } from '@nestjs/common';
import { CriarUsuarioDTO } from './dtos/criar-usuario.dto';
import { Usuario } from './model/usuario.model';
import { UsuarioRepository } from './usuario.repository';

@Injectable()
export class UsuarioService {
  private readonly logger = new Logger(UsuarioService.name);

  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async criarUsuario(criarUsuario: CriarUsuarioDTO): Promise<Usuario> {
    return;
  }
}
