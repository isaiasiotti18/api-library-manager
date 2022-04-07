import { EditoraRepository } from './../editora.repository';
import { Editora } from './../model/editora.model';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ConsultarEditoraService {
  constructor(private readonly editoraRepository: EditoraRepository) {}

  async execute(editora: string): Promise<Editora> {
    const editoraJaCadastrado = await this.editoraRepository.procurarEditora(
      editora,
    );

    if (!editoraJaCadastrado) {
      throw new NotFoundException(`Autor não castrado na base de dados`);
    }

    return editoraJaCadastrado;
  }
}
