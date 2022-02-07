import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CriarAutorDTO } from './dtos/criar-autor.dto';
import { AutorRepository } from './autor.repository';
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

  async procurarAutor(autor: string): Promise<Autor> {
    const autorJaCadastrado = await this.autorRepository.procurarAutor(autor);

    if (!autorJaCadastrado) {
      throw new NotFoundException(`Autor não castrado na base de dados`);
    }

    return autorJaCadastrado;
  }
}
