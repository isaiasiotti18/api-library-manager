import { EntityRepository, Like, Repository } from 'typeorm';
import { LivroDTO } from './dtos/livro.dto';
import { LivroRepositoryInterface } from './interfaces/livro-repository.interface';
import { LivroResultado } from './interfaces/livro-response.interface';
import { Livro } from './model/livro.model';

@EntityRepository(Livro)
export class LivroRepository
  extends Repository<Livro>
  implements LivroRepositoryInterface
{
  async consultarLivroPeloTitulo(
    titulo_livro: string,
  ): Promise<LivroResultado[]> {
    const queryResult = this.query(`
    SELECT 
    livro.titulo,
    autor.nome,
    editora.editora,
    livro.isbn,
    livro.publicacao,
    livro.qtd_paginas
    FROM livro
    JOIN autor ON autor.autor_id = livro.autor_id
    JOIN editora ON editora.editora_id = livro.editora_id
    WHERE livro.titulo LIKE '%${titulo_livro}%';
    `);

    return queryResult;
  }

  async consultarLivros(): Promise<LivroResultado[]> {
    const livros = await this.find({
      order: { titulo: 'ASC' },
      relations: ['autor', 'editora'],
      skip: 0,
      take: 5,
    });

    return livros.map((livro) => {
      const livroObj: LivroResultado = {
        titulo: livro.titulo,
        autor: livro.autor.nome,
        editora: livro.editora.editora,
        isbn: livro.isbn,
        publicacao: livro.publicacao,
        qtd_paginas: livro.qtd_paginas,
      };

      return livroObj;
    });
  }

  async consultarLivro(isbn_livro: string): Promise<Livro> {
    return await this.findOne({ isbn: isbn_livro });
  }

  async consultarLivrosPorGenero(genero: string): Promise<LivroResultado[]> {
    const listaLivros: LivroResultado[] = await this.query(`
    SELECT 
      livro.titulo, 
      livro.isbn, 
      livro.publicacao, 
      livro.qtd_paginas,
      autor.nome as autor,
      editora.editora,
      genero.genero
      FROM livro
      JOIN livro_genero ON livro.livro_id = livro_genero.livro_id
      JOIN genero ON genero.genero_id = livro_genero.genero_id
      JOIN autor ON autor.autor_id = livro.autor_id
      JOIN editora ON editora.editora_id = livro.editora_id
      WHERE genero.genero = "${genero}"
  `);

    return listaLivros.map((livro) => {
      const livroObj = {
        titulo: livro.titulo,
        autor: livro.autor,
        editora: livro.editora,
        isbn: livro.isbn,
        qtd_paginas: livro.qtd_paginas,
        publicacao: livro.publicacao,
      };

      return livroObj;
    });
  }

  async adicionarRelacionamentoLivroGenero(
    livro_id: string,
    genero_id: string,
  ): Promise<void> {
    return await this.query(
      `INSERT INTO livro_genero(livro_id, genero_id) VALUES ("${livro_id}", "${genero_id}")`,
    );
  }

  async criarLivro(livro: LivroDTO): Promise<Livro> {
    const novoLivro = this.create(livro);

    return await this.save(novoLivro);
  }
}
