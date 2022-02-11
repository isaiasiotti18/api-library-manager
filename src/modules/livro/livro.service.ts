import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AutorService } from '../autor/autor.service';
import { EditoraService } from '../editora/editora.service';
import { LivroRequestDTO } from './dtos/livro.request.dto';
import { Livro } from './model/livro.model';
import { LivroRepository } from './livro.repository';
import { GeneroService } from '../genero/genero.service';
import { LivroResponse } from './interfaces/livro-response.interface';

@Injectable()
export class LivroService {
  constructor(
    private readonly livroRepository: LivroRepository,
    private readonly autorService: AutorService,
    private readonly editoraService: EditoraService,
    private readonly generoService: GeneroService,
  ) {}

  public async consultarLivros(): Promise<LivroResponse[]> {
    const livros = await this.livroRepository.find({
      relations: ['autor', 'editora'],
    });

    return livros.map((livro) => {
      const livroObj: LivroResponse = {
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

  public async consultarLivrosPorGenero(
    genero: string,
  ): Promise<LivroResponse[]> {
    try {
      const generoJaCadastrado = await this.generoService.procurarGenero(
        genero,
      );

      const listaLivros: LivroResponse[] = await this.livroRepository.query(`
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
          WHERE genero.genero = "${generoJaCadastrado.genero}"
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
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  public async consultarLivro(isbn_livro: string): Promise<Livro> {
    const livroJaCadastrado = await this.livroRepository.consultarLivro(
      isbn_livro,
    );

    return livroJaCadastrado;
  }

  public async criarLivro({
    titulo,
    nome_editora,
    nome_autor,
    genero,
    isbn,
    publicacao,
    qtd_paginas,
  }: LivroRequestDTO): Promise<Livro> {
    try {
      const livroJaCadastrado = await this.consultarLivro(isbn);

      if (livroJaCadastrado) {
        throw new BadRequestException('Livro já cadastrado na base de dados.');
      }

      const autorJaCadastrado = await this.autorService.procurarAutor(
        nome_autor,
      );
      const editoraJaCadastrado = await this.editoraService.procurarEditora(
        nome_editora,
      );
      const generoJaCadastrado = await this.generoService.procurarGenero(
        genero,
      );
      const novoLivro = await this.livroRepository.criarLivro({
        titulo,
        autor_id: autorJaCadastrado.autor_id,
        editora_id: editoraJaCadastrado.editora_id,
        isbn,
        genero: generoJaCadastrado.genero,
        publicacao,
        qtd_paginas,
      });

      await this.livroRepository.query(
        `INSERT INTO livro_genero(livro_id, genero_id) VALUES ("${novoLivro.livro_id}", "${generoJaCadastrado.genero_id}")`,
      );

      return novoLivro;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async atribuirGeneroALivro(
    isbn_livro: string,
    genero: string,
  ): Promise<void> {
    try {
      const livroJaCadastrado = await this.consultarLivro(isbn_livro);
      const generoJaCadastrado = await this.generoService.procurarGenero(
        genero,
      );

      if (generoJaCadastrado) {
        await this.livroRepository.query(
          `INSERT INTO livro_genero(livro_id, genero_id) 
          VALUES ("${livroJaCadastrado.livro_id}", "${generoJaCadastrado.genero_id}")`,
        );
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  public async consultarLivroPeloTitulo(
    titulo_livro: string,
  ): Promise<Livro | any> {
    const livro = await this.livroRepository.consultarLivroPeloTitulo(
      titulo_livro,
    );

    const queryGeneros = await this.livroRepository.query(`
      SELECT genero.genero from livro
      JOIN livro_genero ON livro.livro_id = livro_genero.livro_id
      JOIN genero ON genero.genero_id = livro_genero.genero_id
      WHERE livro.titulo = "${livro.titulo}";
    `);

    if (queryGeneros.length === 0) {
      throw new NotFoundException(
        'Ops! Não há nenhum livro correspondente com o título informado. Tente novamente!',
      );
    }

    const autorLivro = await this.livroRepository.findOne({
      relations: ['autor'],
      where: { titulo: livro.titulo },
    });

    const editoraLivro = await this.livroRepository.findOne({
      relations: ['editora'],
      where: { titulo: livro.titulo },
    });

    const autor = autorLivro.autor.nome;
    const editora = editoraLivro.editora.editora;
    const generos = queryGeneros.map((genero) => genero.genero);

    const retornoLivro = {
      titulo: livro.titulo,
      autor,
      editora,
      generos: [...generos],
      isbn: livro.isbn,
      paginas: livro.qtd_paginas,
      publicacao: livro.publicacao,
    };

    return retornoLivro;
  }
}
