import { LivroRepository } from 'src/modules/livro/livro.repository';
import { ConsultarLivroService } from './consultar-livro.service';
import { AtualizarLivroDTO } from '../dtos/atualizar-livro.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AtualizarLivroService {
  constructor(
    private readonly consultarLivroService: ConsultarLivroService,
    private readonly livroRepository: LivroRepository,
  ) {}
  async execute(
    isbn_livro: string,
    atualizarLivroDTO: AtualizarLivroDTO,
  ): Promise<void> {
    try {
      const livroJaCadastrado = await this.consultarLivroService.execute(
        isbn_livro,
      );

      if (livroJaCadastrado) {
        await this.livroRepository.atualizarLivro(
          isbn_livro,
          atualizarLivroDTO,
        );
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
