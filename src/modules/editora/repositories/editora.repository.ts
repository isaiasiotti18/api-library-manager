import { EntityRepository, Repository } from 'typeorm';
import { CriarEditoraDTO } from '../dtos/criar-editora.dto';
import { AutorRepositoryInterface } from '../interfaces/editora-repository.interface';
import { Editora } from '../model/editora.model';

@EntityRepository(Editora)
export class EditoraRepository
  extends Repository<Editora>
  implements AutorRepositoryInterface
{
  async criarEditora(editora: CriarEditoraDTO): Promise<Editora> {
    const novaEditora = this.create(editora);

    return await this.save(novaEditora);
  }

  async procurarEditora(nome_editora: string): Promise<Editora> {
    return await this.findOne({ editora: nome_editora });
  }
}
