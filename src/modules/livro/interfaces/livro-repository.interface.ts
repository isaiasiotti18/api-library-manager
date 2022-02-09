import { LivroDTO } from '../daos/criar-livro.dto';
import { Livro } from '../model/livro.model';

export interface LivroRepositoryInterface {
  criarLivro(livro: LivroDTO): Promise<Livro>;
  consultarLivro(isbn_livro: string): Promise<Livro>;
}
