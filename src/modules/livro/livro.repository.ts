import { EntityRepository, Repository } from 'typeorm';
import { LivroDTO } from './dtos/livro.dto';
import { LivroRepositoryInterface } from './interfaces/livro-repository.interface';
import { Livro } from './model/livro.model';

@EntityRepository(Livro)
export class LivroRepository
  extends Repository<Livro>
  implements LivroRepositoryInterface
{
  async consultarLivroPeloTitulo(titulo_livro: string): Promise<Livro> {
    return await this.findOne({ titulo: titulo_livro });
  }

  async consultarLivro(isbn_livro: string): Promise<Livro> {
    return await this.findOne({ isbn: isbn_livro });
  }

  async criarLivro(livro: LivroDTO): Promise<Livro> {
    const novoLivro = this.create(livro);

    return await this.save(novoLivro);
  }
}
