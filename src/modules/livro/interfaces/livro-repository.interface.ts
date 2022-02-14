import { LivroDTO } from '../dtos/livro.dto';
import { Livro } from '../model/livro.model';
import { LivroResultado } from './livro-response.interface';

export interface LivroRepositoryInterface {
  criarLivro(livro: LivroDTO): Promise<Livro>;
  consultarLivro(isbn_livro: string): Promise<Livro>;
  consultarLivroPeloTitulo(titulo_livro: string): Promise<LivroResultado[]>;
  consultarLivros(): Promise<LivroResultado[]>;
  consultarLivrosPorGenero(genero: string): Promise<LivroResultado[]>;
  adicionarRelacionamentoLivroGenero(
    livro_id: string,
    genero_id: string,
  ): Promise<void>;
}
