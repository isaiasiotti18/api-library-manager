import { Injectable, NotFoundException } from '@nestjs/common';
import { GeneroRepository } from '../genero.repository';
import { Genero } from '../model/genero.model';

@Injectable()
export class ConsultarGeneroService {
  constructor(private readonly generoRepository: GeneroRepository) {}

  async execute(genero: string): Promise<Genero> {
    const generoEncontrado = await this.generoRepository.procurarGenero(genero);

    if (!generoEncontrado) {
      throw new NotFoundException(`Genero: ${genero} não existe`);
    }

    return generoEncontrado;
  }
}
