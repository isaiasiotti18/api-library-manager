import { Injectable, NotFoundException } from '@nestjs/common';
import { AutorRepository } from '../autor.repository';
import { Autor } from '../model/autor.model';

@Injectable()
export class ConsultarAutorService {
  constructor(private readonly autorRepository: AutorRepository) {}

  async execute(autor: string): Promise<Autor> {
    const autorJaCadastrado = await this.autorRepository.consultarAutor(autor);

    if (!autorJaCadastrado) {
      throw new NotFoundException(`Autor não castrado na base de dados`);
    }

    return autorJaCadastrado;
  }
}
