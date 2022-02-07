import { EntityRepository, Repository } from 'typeorm';
import { CriarAutorDTO } from '../dtos/criar-autor.dto';
import { AutorRepositoryInterface } from '../interfaces/autor-repository.interface';
import { Autor } from '../model/autor.model';

@EntityRepository(Autor)
export class AutorRepository
  extends Repository<Autor>
  implements AutorRepositoryInterface
{
  async criarAutor(autor: CriarAutorDTO): Promise<Autor> {
    const novoAutor = this.create(autor);
    return await this.save(novoAutor);
  }

  async procurarAutor(nome_autor: string): Promise<Autor> {
    return await this.findOne({ nome: nome_autor });
  }
}
