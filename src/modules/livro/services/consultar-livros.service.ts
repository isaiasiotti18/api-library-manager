import { BadRequestException, Injectable } from '@nestjs/common';
import { PageOptionsDto } from '../../../utils/pagination/page-options.dto';
import { PageDto } from '../../../utils/pagination/page.dto';
import { LivroResultado } from '../interfaces/livro-resultado.interface';
import { LivroRepository } from '../livro.repository';

@Injectable()
export class ConsultarLivrosService {
  constructor(private readonly livroRepository: LivroRepository) {}

  public async execute(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<LivroResultado>> {
    try {
      return await this.livroRepository.consultarLivros(pageOptionsDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
