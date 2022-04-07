import { AutorRepository } from './../autor.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Autor } from '../model/autor.model';
import { CriarAutorDTO } from '../dtos/criar-autor.dto';

@Injectable()
export class CadastrarAutorService {
  constructor(private readonly autorRepository: AutorRepository) {}

  async cadastrarAutor(autor: CriarAutorDTO): Promise<Autor> {
    try {
      return await this.autorRepository.cadastrarAutor(autor);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
