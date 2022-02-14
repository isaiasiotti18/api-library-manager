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
import { LivroResultado } from './interfaces/livro-response.interface';

@Injectable()
export class LivroService {
  constructor(
    private readonly livroRepository: LivroRepository,
    private readonly autorService: AutorService,
    private readonly editoraService: EditoraService,
    private readonly generoService: GeneroService,
  ) {}

  public async consultarLivros(): Promise<LivroResultado[]> {
    try {
      return await this.livroRepository.consultarLivros();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async consultarLivrosPorGenero(
    genero: string,
  ): Promise<LivroResultado[]> {
    try {
      const generoJaCadastrado = await this.generoService.procurarGenero(
        genero,
      );

      return await this.livroRepository.consultarLivrosPorGenero(
        generoJaCadastrado.genero,
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  public async consultarLivro(isbn_livro: string): Promise<Livro> {
    try {
      const livroJaCadastrado = await this.livroRepository.consultarLivro(
        isbn_livro,
      );

      return livroJaCadastrado;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
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

      await this.livroRepository.adicionarRelacionamentoLivroGenero(
        novoLivro.livro_id,
        generoJaCadastrado.genero_id,
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
        await this.livroRepository.adicionarRelacionamentoLivroGenero(
          livroJaCadastrado.livro_id,
          generoJaCadastrado.genero_id,
        );
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  public async consultarLivroPeloTitulo(
    titulo_livro: string,
  ): Promise<LivroResultado[]> {
    if (titulo_livro.length == 0) {
      throw new BadRequestException(
        'O campo título para pesquisa não pode estar vazio.',
      );
    }

    const result = await this.livroRepository.consultarLivroPeloTitulo(
      titulo_livro,
    );

    if (result.length == 0) {
      throw new NotFoundException('Nenhum livro foi encontrado.');
    }

    return result;
  }
}
