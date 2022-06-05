import { UsuarioRepository } from './../usuario.repository';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class AtribuirAluguelAoUsuarioService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(usuario_id: string, aluguel_id: string): Promise<void> {
    if (!usuario_id || !aluguel_id) {
      throw new BadRequestException('Atribuição falhou.');
    } else {
      await this.usuarioRepository.atribuirAluguel(usuario_id, aluguel_id);
    }
  }
}
