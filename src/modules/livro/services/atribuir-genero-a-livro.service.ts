import { LivroRepository } from 'src/modules/livro/livro.repository';
import { ConsultarGeneroService } from './../../genero/services/consultar-genero.service';
import { ConsultarLivroService } from './consultar-livro.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AtribuirGeneroALivro {
  constructor(
    private readonly livroRepository: LivroRepository,
    private readonly consultarLivroService: ConsultarLivroService,
    private readonly consultarGeneroService: ConsultarGeneroService,
  ) {}

  async execute(isbn_livro: string, genero: string): Promise<void> {
    try {
      const livroJaCadastrado = await this.consultarLivroService.execute(
        isbn_livro,
      );
      const generoJaCadastrado = await this.consultarGeneroService.execute(
        genero,
      );

      if (generoJaCadastrado) {
        await this.livroRepository.adicionarRelacionamentoLivroGenero(
          livroJaCadastrado.livro_id,
          generoJaCadastrado.genero_id,
        );
      }
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
