import { Injectable, BadRequestException } from '@nestjs/common';
import { Usuario } from '../model/usuario.model';
import { UsuarioRepository } from './../usuario.repository';

@Injectable()
export class ListarUsuariosBloqueadosService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(): Promise<Usuario[]> {
    try {
      return await this.usuarioRepository.listarUsuariosBloqueados();
    } catch (error: any) {
      throw new BadRequestException(error?.message);
    }
  }
}
