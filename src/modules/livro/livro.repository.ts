import { EntityRepository, Repository } from 'typeorm';
import { CriarLivroDTO } from './dtos/criar-livro.dto';
import { LivroRepositoryInterface } from './interfaces/livro-repository.interface';
import { Livro } from './model/livro.model';

@EntityRepository(Livro)
export class LivroRepository
  extends Repository<Livro>
  implements LivroRepositoryInterface
{
  async procurarLivro(isbn_livro: string): Promise<Livro> {
    return await this.findOne({ isbn: isbn_livro });
  }
  async criarLivro(livro: CriarLivroDTO): Promise<Livro> {
    const novoLivro = this.create(livro);

    return await this.save(novoLivro);
  }
}
