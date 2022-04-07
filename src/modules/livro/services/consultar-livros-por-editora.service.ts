import { LivroRepository } from 'src/modules/livro/livro.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LivroResultado } from '../interfaces/livro-resultado.interface';
import { ConsultarEditoraService } from 'src/modules/editora/services/consultar-editora.service';

@Injectable()
export class ConsultarLivrosPorEditoraService {
  constructor(
    private readonly livroRepository: LivroRepository,
    private readonly consultarEditoraService: ConsultarEditoraService,
  ) {}

  public async execute(nome_editora: string): Promise<LivroResultado[]> {
    try {
      if (nome_editora.length === 0) {
        throw new BadRequestException(
          'O campo nome_editora para pesquisa não pode estar vazio.',
        );
      }

      const editoraJaCadastrado = await this.consultarEditoraService.execute(
        nome_editora,
      );

      const retornoLivros =
        await this.livroRepository.consultarLivrosPorEditora(
          editoraJaCadastrado.editora,
        );

      if (retornoLivros.length === 0) {
        console.log(editoraJaCadastrado.editora);
        throw new NotFoundException('Nenhum livro foi encontrado.');
      }

      return retornoLivros;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
