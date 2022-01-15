import { Injectable, NotFoundException } from '@nestjs/common';
import { CriarGeneroDTO } from './dtos/criar-genero.dto';
import { Genero } from './model/genero.model';
import { GeneroRepository } from './repositories/genero.repository';

@Injectable()
export class GeneroService {
  constructor(private readonly generoRepository: GeneroRepository) {}

  async criarGenero(genero: CriarGeneroDTO): Promise<Genero> {
    return await this.generoRepository.criarGenero(genero);
  }

  async procurarGenero(genero: string): Promise<Genero> {
    const generoEncontrado = await this.generoRepository.procurarGenero(genero);

    if (!generoEncontrado) {
      throw new NotFoundException(`Genero: ${genero} não existe`);
    }

    return generoEncontrado;
  }
}
