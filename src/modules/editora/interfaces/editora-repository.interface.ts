import { CriarEditoraDTO } from '../dtos/criar-editora.dto';
import { Editora } from '../model/editora.model';

export interface AutorRepositoryInterface {
  criarEditora(autor: CriarEditoraDTO): Promise<Editora>;
  procurarEditora(nome_editora: string): Promise<Editora>;
}
