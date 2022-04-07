import { ConsultarAutorService } from 'src/modules/autor/services/consultar-autor.service';
import { ConsultarGeneroService } from './../../genero/services/consultar-genero.service';
import { LivroRepository } from './../livro.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { LivroBodyJSON } from '../interfaces/livro-body-json';
import { ConsultarEditoraService } from 'src/modules/editora/services/consultar-editora.service';
import { Livro } from '../model/livro.model';
import { ConsultarLivroService } from './consultar-livro.service';

@Injectable()
export class CadastrarLivroService {
  constructor(
    private readonly livroRepository: LivroRepository,
    private readonly consultarAutorService: ConsultarAutorService,
    private readonly consultarEditoraService: ConsultarEditoraService,
    private readonly consultarLivroService: ConsultarLivroService,
    private readonly consultarGeneroService: ConsultarGeneroService,
  ) {}

  async execute({
    titulo,
    nome_editora,
    nome_autor,
    genero,
    isbn,
    publicacao,
    estoque,
    preco,
    qtd_paginas,
  }: LivroBodyJSON): Promise<Livro> {
    try {
      const livroJaCadastrado = await this.consultarLivroService.execute(isbn);

      if (livroJaCadastrado) {
        throw new BadRequestException('Livro já cadastrado na base de dados.');
      }

      const autorJaCadastrado = await this.consultarAutorService.execute(
        nome_autor,
      );

      const editoraJaCadastrado = await this.consultarEditoraService.execute(
        nome_editora,
      );

      const generoJaCadastrado = await this.consultarGeneroService.execute(
        genero,
      );

      const novoLivro = await this.livroRepository.cadastrarLivro({
        titulo,
        autor_id: autorJaCadastrado.autor_id,
        editora_id: editoraJaCadastrado.editora_id,
        isbn,
        genero: generoJaCadastrado.genero,
        publicacao,
        estoque,
        preco,
        qtd_paginas,
      });

      await this.livroRepository.adicionarRelacionamentoLivroGenero(
        novoLivro.livro_id,
        generoJaCadastrado.genero_id,
      );

      return novoLivro;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
