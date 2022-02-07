import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AutorService } from '../autor/autor.service';
import { EditoraService } from '../editora/editora.service';
import { LivroRequestDTO } from './dtos/livro.request.dto';
import { Livro } from './model/livro.model';
import { LivroRepository } from './livro.repository';
import { GeneroService } from '../genero/genero.service';

@Injectable()
export class LivroService {
  private logger = new Logger(LivroService.name);
  constructor(
    private readonly livroRepository: LivroRepository,
    private readonly autorService: AutorService,
    private readonly editoraService: EditoraService,
    private readonly generoService: GeneroService,
  ) {}

  public async consultarLivros(): Promise<Livro[]> {
    return await this.livroRepository.find();
  }

  public async procurarLivro(isbn_livro: string): Promise<Livro> {
    const livroJaCadastrado = await this.livroRepository.procurarLivro(
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
    const livroJaCadastrado = await this.procurarLivro(isbn);

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
}
