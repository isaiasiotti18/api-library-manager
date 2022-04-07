import { GeneroRepository } from './../genero.repository';
import { Genero } from './../model/genero.model';
import { CriarGeneroDTO } from './../dtos/criar-genero.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CadastrarGeneroService {
  constructor(private readonly generoRepository: GeneroRepository) {}
  async execute(genero: CriarGeneroDTO): Promise<Genero> {
    return await this.generoRepository.criarGenero(genero);
  }
}
