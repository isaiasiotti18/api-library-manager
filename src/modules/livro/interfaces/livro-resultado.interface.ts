import { ApiProperty } from '@nestjs/swagger';
import { Autor } from 'src/modules/autor/model/autor.model';
import { Editora } from 'src/modules/editora/model/editora.model';
import { Genero } from 'src/modules/genero/model/genero.model';

export class LivroResultado {
  @ApiProperty()
  titulo: string;

  @ApiProperty()
  autor: Autor;

  @ApiProperty()
  editora: Editora;

  @ApiProperty()
  generos?: Genero[];

  @ApiProperty()
  isbn: string;

  @ApiProperty()
  publicacao: Date;

  @ApiProperty()
  qtd_paginas: number;
}
