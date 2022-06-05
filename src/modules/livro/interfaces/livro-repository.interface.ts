import { LivroDTO } from '../dtos/livro.dto';
import { Livro } from '../model/livro.model';
import { LivroResultado } from './livro-resultado.interface';
import { PageDto } from 'src/utils/pagination/page.dto';
import { PageOptionsDto } from 'src/utils/pagination/page-options.dto';

export interface LivroRepositoryInterface {
  cadastrarLivro(livro: LivroDTO): Promise<Livro>;

  consultarLivro(isbn_livro: string): Promise<Livro>;

  consultarLivrosPorTitulo(
    pageOptionsDto: PageOptionsDto,
    titulo_livro: string,
  ): Promise<PageDto<LivroResultado>>;

  consultarLivros(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<LivroResultado>>;

  consultarLivrosPorGenero(genero: string): Promise<LivroResultado[]>;

  consultarLivrosPorAutor(nome_autor: string): Promise<LivroResultado[]>;

  consultarLivrosPorEditora(nome_editora: string): Promise<LivroResultado[]>;

  adicionarRelacionamentoLivroGenero(
    livro_id: string,
    genero_id: string,
  ): Promise<void>;
}
