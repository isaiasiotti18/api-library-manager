import { PageOptionsDto } from './../../../utils/pagination/page-options.dto';
import { PageDto } from './../../../utils/pagination/page.dto';
import { LivroRepository } from 'src/modules/livro/livro.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { LivroResultado } from '../interfaces/livro-resultado.interface';

@Injectable()
export class ConsultarLivrosPorTituloService {
  constructor(private readonly livroRepository: LivroRepository) {}

  public async execute(
    pageOptionsDto: PageOptionsDto,
    titulo_livro: string,
  ): Promise<PageDto<LivroResultado>> {
    if (titulo_livro.length == 0) {
      throw new BadRequestException(
        'O campo título para pesquisa não pode estar vazio.',
      );
    }

    const retornoLivros = await this.livroRepository.consultarLivrosPorTitulo(
      pageOptionsDto,
      titulo_livro,
    );

    return retornoLivros;
  }
}
