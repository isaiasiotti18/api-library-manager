import { LivroRepository } from 'src/modules/livro/livro.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LivroResultado } from '../interfaces/livro-resultado.interface';
import { ConsultarAutorService } from 'src/modules/autor/services/consultar-autor.service';

@Injectable()
export class ConsultarLivrosPorAutorService {
  constructor(
    private readonly livroRepository: LivroRepository,
    private readonly consultarAutorService: ConsultarAutorService,
  ) {}

  public async execute(nome_autor: string): Promise<LivroResultado[]> {
    try {
      if (nome_autor.length === 0) {
        throw new BadRequestException(
          'O campo nome_autor para pesquisa não pode estar vazio.',
        );
      }

      const autorJaCadastrado = await this.consultarAutorService.execute(
        nome_autor,
      );

      const retornoLivros = await this.livroRepository.consultarLivrosPorAutor(
        autorJaCadastrado.nome,
      );

      if (retornoLivros.length === 0) {
        console.log(autorJaCadastrado.nome);
        throw new NotFoundException('Nenhum livro foi encontrado.');
      }

      return retornoLivros;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
