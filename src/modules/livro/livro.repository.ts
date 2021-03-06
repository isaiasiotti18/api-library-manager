import { EntityRepository, Repository } from 'typeorm';
import { LivroDTO } from './dtos/livro.dto';
import { LivroRepositoryInterface } from './interfaces/livro-repository.interface';
import { LivroResultado } from './interfaces/livro-resultado.interface';
import { Livro } from './model/livro.model';
import { PageDto } from 'src/utils/pagination/page.dto';
import { PageOptionsDto } from 'src/utils/pagination/page-options.dto';
import { PageMetaDto } from 'src/utils/pagination/page-meta.dto';
import { AtualizarLivroDTO } from './dtos/atualizar-livro.dto';

@EntityRepository(Livro)
export class LivroRepository
  extends Repository<Livro>
  implements LivroRepositoryInterface
{
  async cadastrarLivro(livro: LivroDTO): Promise<Livro> {
    const { preco } = livro;

    const novoLivro = this.create({
      ...livro,
      preco: Number(preco),
    });

    return await this.save(novoLivro);
  }

  async adicionarRelacionamentoLivroGenero(
    livro_id: string,
    genero_id: string,
  ): Promise<void> {
    return await this.query(
      `INSERT INTO livro_genero(livro_id, genero_id) VALUES ("${livro_id}", "${genero_id}")`,
    );
  }

  async atualizarLivro(
    isbn_livro: string,
    atualizarLivroDTO: AtualizarLivroDTO,
  ): Promise<void> {
    const { preco, urlCapaLivro } = atualizarLivroDTO;

    // await this.save({
    //   isbn_livro,
    //   estoque,
    //   preco,
    //   capa: urlCapaLivro,
    // });

    await this.createQueryBuilder()
      .update()
      .set({
        preco,
        capa: urlCapaLivro,
      })
      .where('isbn = :isbn_livro', { isbn_livro })
      .execute();
  }

  async consultarLivros(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<LivroResultado>> {
    const queryBuilder = this.createQueryBuilder('livro');

    queryBuilder
      .select([
        'livro.livro_id',
        'livro.titulo',
        'livro.isbn',
        'livro.publicacao',
        'livro.qtd_paginas',
      ])
      .innerJoinAndSelect('livro.autor', 'autor')
      .innerJoinAndSelect('livro.editora', 'editora')
      .orderBy('livro.titulo', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .getSql();

    const sql = queryBuilder.getSql();
    console.log(sql);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async consultarLivrosPorTitulo(
    pageOptionsDto: PageOptionsDto,
    titulo_livro: string,
  ): Promise<PageDto<LivroResultado>> {
    const queryBuilder = await this.createQueryBuilder('livro');

    queryBuilder
      .select(['livro.titulo', 'livro.publicacao', 'livro.qtd_paginas'])
      .orderBy('livro.titulo', pageOptionsDto.order)
      .where('livro.titulo like :titulo_livro', {
        titulo_livro: `%${titulo_livro}%`,
      })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
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

  async consultarLivrosPorAutor(nome_autor: string): Promise<LivroResultado[]> {
    const listaLivros: LivroResultado[] = await this.query(`
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
    WHERE autor.nome = '${nome_autor}';
    `);

    return listaLivros;
  }

  async consultarLivrosPorEditora(
    nome_editora: string,
  ): Promise<LivroResultado[]> {
    const listaLivros: LivroResultado[] = await this.query(`
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
    WHERE editora.editora = '${nome_editora}';
    `);

    return listaLivros;
  }
}
