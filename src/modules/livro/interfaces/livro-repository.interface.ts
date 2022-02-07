import { CriarLivroDTO } from '../dtos/criar-livro.dto';
import { Livro } from '../model/livro.model';

export interface LivroRepositoryInterface {
  criarLivro(livro: CriarLivroDTO): Promise<Livro>;
  procurarLivro(isbn_livro: string): Promise<Livro>;
}
