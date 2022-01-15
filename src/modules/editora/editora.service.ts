import { Injectable } from '@nestjs/common';
import { CriarEditoraDTO } from './dtos/criar-editora.dto';
import { Editora } from './model/editora.model';
import { EditoraRepository } from './repositories/editora.repository';

@Injectable()
export class EditoraService {
  constructor(private readonly editoraRepository: EditoraRepository) {}

  async criarEditora(editora: CriarEditoraDTO): Promise<Editora> {
    return await this.editoraRepository.criarEditora(editora);
  }
}
