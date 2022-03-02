import { LivroDTO } from '../dtos/livro.dto';
import { Livro } from '../model/livro.model';
import { LivroResultado } from './livro-resultado.interface';
import { PageDto } from 'src/shared/pagination/page.dto';
import { PageOptionsDto } from 'src/shared/pagination/page-options.dto';

export interface LivroRepositoryInterface {
  criarLivro(livro: LivroDTO): Promise<Livro>;

  consultarLivro(isbn_livro: string): Promise<Livro>;

  consultarLivrosPorTitulo(titulo_livro: string): Promise<LivroResultado[]>;

  consultarLivros(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<LivroResultado>>;

  consultarLivrosPorGenero(genero: string): Promise<LivroResultado[]>;

  adicionarRelacionamentoLivroGenero(
    livro_id: string,
    genero_id: string,
  ): Promise<void>;
  consultarLivrosPorAutor(nome_autor: string): Promise<LivroResultado[]>;

  consultarLivrosPorEditora(nome_editora: string): Promise<LivroResultado[]>;
}
