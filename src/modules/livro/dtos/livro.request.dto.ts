import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LivroRequestDTO {
  @IsNotEmpty({ message: `O título não pode estar vazio.` })
  @IsString({ message: `O título não é uma string válida.` })
  titulo: string;

  @IsNotEmpty({ message: `O nome da editora não pode estar vazio.` })
  @IsString({ message: `O nome da editora não é uma string válida.` })
  nome_editora: string;

  @IsNotEmpty({ message: `O nome do autor não pode estar vazio.` })
  @IsString({ message: `O nome do autor não é uma string válida.` })
  nome_autor: string;

  @IsNotEmpty()
  @IsString()
  genero: string;

  @IsNotEmpty()
  @IsString()
  isbn: string;

  @IsNotEmpty()
  @IsString()
  publicacao: string;

  @IsNotEmpty()
  @IsNumber()
  qtd_paginas: number;
}
