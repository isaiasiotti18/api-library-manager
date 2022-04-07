import { LivroRepository } from './../livro.repository';
import { Livro } from '../model/livro.model';
import { NotFoundException } from '@nestjs/common';

export class ConsultarLivroService {
  constructor(private readonly livroRepository: LivroRepository) {}
  async execute(isbn_livro: string): Promise<Livro> {
    const livroJaCadastrado = await this.livroRepository.consultarLivro(
      isbn_livro,
    );

    if (!livroJaCadastrado)
      throw new NotFoundException('Livro não encontrado.');

    return livroJaCadastrado;
  }
}
