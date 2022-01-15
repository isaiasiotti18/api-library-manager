import { EntityRepository, Repository } from 'typeorm';
import { CriarGeneroDTO } from '../dtos/criar-genero.dto';
import { GeneroRepositoryInterface } from '../interfaces/genero-repository.interface';
import { Genero } from '../model/genero.model';

@EntityRepository(Genero)
export class GeneroRepository
  extends Repository<Genero>
  implements GeneroRepositoryInterface
{
  async criarGenero(genero: CriarGeneroDTO): Promise<Genero> {
    const novoGenero = this.create(genero);

    return await this.save(novoGenero);
  }

  async procurarGenero(genero: string): Promise<Genero> {
    return await this.findOne({ genero });
  }
}
