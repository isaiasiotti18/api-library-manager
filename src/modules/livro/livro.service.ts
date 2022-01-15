import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AutorRepository } from '../autor/repositories/autor.repository';
import { EditoraRepository } from '../editora/repositories/editora.repository';
import { GeneroRepository } from '../genero/repositories/genero.repository';
import { CriarLivroDTO } from './dtos/criar-livro.dto';
import { LivroRequest } from './dtos/livro.request';
import { Livro } from './model/livro.model';
import { LivroRepository } from './repositories/livro.repository';

@Injectable()
export class LivroService {
  constructor(
    private readonly livroRepository: LivroRepository,
    private readonly autorRepository: AutorRepository,
    private readonly editoraRepository: EditoraRepository,
    private readonly generoRepository: GeneroRepository,
  ) {}

  public async consultarLivros(): Promise<Livro[]> {
    return await this.livroRepository.find();
  }

  public async criarLivro({
    titulo,
    nome_editora,
    nome_autor,
    generos,
    isbn,
    publicacao,
    qtd_paginas,
  }: LivroRequest): Promise<Livro> {
    const livroJaExistente = await this.livroRepository.findOne({ isbn });

    if (livroJaExistente) {
      throw new BadRequestException('Livro já existente na base de dados.');
    }

    //Verificando se o autor existe
    const autor = await this.autorRepository.procurarAutor(nome_autor);

    if (!autor) {
      throw new NotFoundException('Autor informado não existe.');
    }

    //Verificando se a editora existe
    const editora = await this.editoraRepository.procurarEditora(nome_editora);

    if (!editora) {
      throw new NotFoundException('Editora informada não existe.');
    }

    //Verificando os generos
    generos.map(async (genero) => {
      const generoEncontrado = await this.generoRepository.procurarGenero(
        genero.genero,
      );

      console.log('Genero: ' + JSON.stringify(generoEncontrado));

      // Caso o genero não exista no banco de dados
      // Ele será adicionado
      if (!generoEncontrado) {
        await this.generoRepository.criarGenero(genero);
      }
    });

    const novoLivro = await this.livroRepository.criarLivro({
      titulo,
      autor_id: autor.autor_id,
      editora_id: editora.editora_id,
      generos,
      isbn,
      publicacao,
      qtd_paginas,
    });

    return novoLivro;
  }
}
