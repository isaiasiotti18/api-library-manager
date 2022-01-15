import { BadRequestException, Injectable } from '@nestjs/common';
import { CriarAutorDTO } from './dtos/criar-autor.dto';
import { AutorRepository } from './repositories/autor.repository';
import { Autor } from './model/autor.model';

@Injectable()
export class AutorService {
  constructor(private readonly autorRepository: AutorRepository) {}

  async criarAutor(autor: CriarAutorDTO): Promise<Autor> {
    try {
      return await this.autorRepository.criarAutor(autor);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
