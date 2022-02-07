import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LivroRequestDTO {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  nome_editora: string;

  @IsNotEmpty()
  @IsString()
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
