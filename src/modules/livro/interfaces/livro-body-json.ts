import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LivroBodyJSON {
  @ApiProperty()
  @IsNotEmpty({ message: `O título não pode estar vazio.` })
  @IsString({ message: `O título não é uma string válida.` })
  titulo: string;

  @ApiProperty()
  @IsNotEmpty({ message: `O nome da editora não pode estar vazio.` })
  @IsString({ message: `O nome da editora não é uma string válida.` })
  nome_editora: string;

  @ApiProperty()
  @IsNotEmpty({ message: `O nome do autor não pode estar vazio.` })
  @IsString({ message: `O nome do autor não é uma string válida.` })
  nome_autor: string;

  @ApiProperty()
  @IsNotEmpty({ message: `O gênero não pode estar vazio.` })
  @IsString({ message: `O gênero não é uma string válida.` })
  genero: string;

  @ApiProperty()
  @IsNotEmpty({ message: `O isbn não pode estar vazio.` })
  @IsString({ message: `O isbn não é uma string válida.` })
  isbn: string;

  @ApiProperty()
  @IsNotEmpty({ message: `A publicação não pode estar vazia.` })
  @IsDateString({ message: `A publicação não é uma string válida.` })
  publicacao: string;

  @ApiProperty()
  @IsNotEmpty({ message: `A quantidade de páginas precisa ser informada.` })
  @IsNumber()
  qtd_paginas: number;
}
