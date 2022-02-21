import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AutorService } from '../autor/autor.service';
import { EditoraService } from '../editora/editora.service';
import { LivroBodyJSON } from './interfaces/livro-body-json';
import { Livro } from './model/livro.model';
import { LivroRepository } from './livro.repository';
import { GeneroService } from '../genero/genero.service';
import { LivroResultado } from './interfaces/livro-resultado.interface';
import { PageOptionsDto } from 'src/config/pagination/page-options.dto';
import { PageDto } from 'src/config/pagination/page.dto';

@Injectable()
export class LivroService {
  constructor(
    private readonly livroRepository: LivroRepository,
    private readonly autorService: AutorService,
    private readonly editoraService: EditoraService,
    private readonly generoService: GeneroService,
  ) {}

  public async criarLivro({
    titulo,
    nome_editora,
    nome_autor,
    genero,
    isbn,
    publicacao,
    qtd_paginas,
  }: LivroBodyJSON): Promise<Livro> {
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

  public async consultarLivros(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<LivroResultado>> {
    try {
      return await this.livroRepository.consultarLivros(pageOptionsDto);
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

  public async consultarLivrosPorTitulo(
    titulo_livro: string,
  ): Promise<LivroResultado[]> {
    if (titulo_livro.length == 0) {
      throw new BadRequestException(
        'O campo título para pesquisa não pode estar vazio.',
      );
    }

    const retornoLivros = await this.livroRepository.consultarLivrosPorTitulo(
      titulo_livro,
    );

    if (retornoLivros.length == 0) {
      throw new NotFoundException('Nenhum livro foi encontrado.');
    }

    return retornoLivros;
  }

  public async consultarLivrosPorAutor(
    nome_autor: string,
  ): Promise<LivroResultado[]> {
    try {
      if (nome_autor.length === 0) {
        throw new BadRequestException(
          'O campo nome_autor para pesquisa não pode estar vazio.',
        );
      }

      const autorJaCadastrado = await this.autorService.procurarAutor(
        nome_autor,
      );

      const retornoLivros = await this.livroRepository.consultarLivrosPorAutor(
        autorJaCadastrado.nome,
      );

      if (retornoLivros.length === 0) {
        console.log(autorJaCadastrado.nome);
        throw new NotFoundException('Nenhum livro foi encontrado.');
      }

      return retornoLivros;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async consultarLivrosPorEditora(
    nome_editora: string,
  ): Promise<LivroResultado[]> {
    try {
      if (nome_editora.length === 0) {
        throw new BadRequestException(
          'O campo nome_editora para pesquisa não pode estar vazio.',
        );
      }

      const editoraJaCadastrado = await this.editoraService.procurarEditora(
        nome_editora,
      );

      const retornoLivros =
        await this.livroRepository.consultarLivrosPorEditora(
          editoraJaCadastrado.editora,
        );

      if (retornoLivros.length === 0) {
        console.log(editoraJaCadastrado.editora);
        throw new NotFoundException('Nenhum livro foi encontrado.');
      }

      return retornoLivros;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
