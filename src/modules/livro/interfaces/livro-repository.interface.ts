import { LivroDTO } from '../dtos/livro.dto';
import { Livro } from '../model/livro.model';

export interface LivroRepositoryInterface {
  criarLivro(livro: LivroDTO): Promise<Livro>;
  consultarLivro(isbn_livro: string): Promise<Livro>;
  consultarLivroPeloTitulo(titulo_livro: string): Promise<Livro>;
}
