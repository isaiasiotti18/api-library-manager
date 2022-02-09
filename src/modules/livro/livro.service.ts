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

@Injectable()
export class LivroService {
  constructor(
    private readonly livroRepository: LivroRepository,
    private readonly autorService: AutorService,
    private readonly editoraService: EditoraService,
    private readonly generoService: GeneroService,
  ) {}

  public async consultarLivros(): Promise<Livro[]> {
    return await this.livroRepository.find();
  }

  public async consultarLivrosPorGenero(genero: string): Promise<Livro[]> {
    try {
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    const generoJaCadastrado = await this.generoService.procurarGenero(genero);

    const listaLivros = await this.livroRepository.query(`
      SELECT livro.titulo, genero.genero
        FROM livro
        JOIN livro_genero ON livro.livro_id = livro_genero.livro_id
        JOIN genero ON genero.genero_id = livro_genero.genero_id
        WHERE genero.genero = "${generoJaCadastrado.genero}"
    `);

    return listaLivros;
  }

  public async consultarLivro(isbn_livro: string): Promise<Livro> {
    const livroJaCadastrado = await this.livroRepository.consultarLivro(
      isbn_livro,
    );

    if (!livroJaCadastrado) {
      throw new NotFoundException(`Livro não cadastrado na base de dados.`);
    }

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
    const livroJaCadastrado = await this.consultarLivro(isbn);

    if (livroJaCadastrado) {
      throw new BadRequestException('Livro já cadastrado na base de dados.');
    }

    const autorJaCadastrado = await this.autorService.procurarAutor(nome_autor);
    const editoraJaCadastrado = await this.editoraService.procurarEditora(
      nome_editora,
    );
    const generoJaCadastrado = await this.generoService.procurarGenero(genero);
    try {
      const novoLivro = await this.livroRepository.criarLivro({
        titulo,
        autor_id: autorJaCadastrado.autor_id,
        editora_id: editoraJaCadastrado.editora_id,
        generos: [generoJaCadastrado],
        isbn,
        publicacao,
        qtd_paginas,
      });

      await this.livroRepository.query(
        `INSERT INTO livro_genero(livro_id, genero_id) VALUES ("${novoLivro.livro_id}", "${novoLivro.generos[0].genero_id}")`,
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
}
