import { LivroRepository } from './../livro.repository';
import { Livro } from '../model/livro.model';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ConsultarLivroService {
  constructor(private readonly livroRepository: LivroRepository) {}

  async execute(isbn_livro: string): Promise<Livro> {
    const livroJaCadastrado = await this.livroRepository.consultarLivro(
      isbn_livro,
    );

    if (livroJaCadastrado) return livroJaCadastrado;

    return;
  }
}
