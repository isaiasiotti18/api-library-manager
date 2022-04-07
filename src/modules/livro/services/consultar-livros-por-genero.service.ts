import { LivroRepository } from 'src/modules/livro/livro.repository';
import { ConsultarGeneroService } from './../../genero/services/consultar-genero.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LivroResultado } from '../interfaces/livro-resultado.interface';

@Injectable()
export class ConsultarLivrosPorGeneroService {
  constructor(
    private readonly livroRepository: LivroRepository,
    private readonly consultarGeneroService: ConsultarGeneroService,
  ) {}
  public async execute(genero: string): Promise<LivroResultado[]> {
    try {
      const generoJaCadastrado = await this.consultarGeneroService.execute(
        genero,
      );

      return await this.livroRepository.consultarLivrosPorGenero(
        generoJaCadastrado.genero,
      );
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
