import { Injectable, NotFoundException } from '@nestjs/common';
import { CriarEditoraDTO } from './dtos/criar-editora.dto';
import { Editora } from './model/editora.model';
import { EditoraRepository } from './editora.repository';

@Injectable()
export class EditoraService {
  constructor(private readonly editoraRepository: EditoraRepository) {}

  async criarEditora(editora: CriarEditoraDTO): Promise<Editora> {
    return await this.editoraRepository.criarEditora(editora);
  }

  async procurarEditora(editora: string): Promise<Editora> {
    const editoraJaCadastrado = await this.editoraRepository.procurarEditora(
      editora,
    );

    if (!editoraJaCadastrado) {
      throw new NotFoundException(`Autor não castrado na base de dados`);
    }

    return editoraJaCadastrado;
  }
}
