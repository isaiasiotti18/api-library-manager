import { Injectable } from '@nestjs/common';
import { CriarEditoraDTO } from '../dtos/criar-editora.dto';
import { EditoraRepository } from '../editora.repository';
import { Editora } from '../model/editora.model';

@Injectable()
export class CadastrarEditoraService {
  constructor(private readonly editoraRepository: EditoraRepository) {}

  async execute(editora: CriarEditoraDTO): Promise<Editora> {
    return await this.editoraRepository.criarEditora(editora);
  }
}
