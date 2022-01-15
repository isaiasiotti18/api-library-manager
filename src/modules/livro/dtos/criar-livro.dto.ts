import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Genero } from 'src/modules/genero/model/genero.model';

export class CriarLivroDTO {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  autor_id: string;

  @IsNotEmpty()
  @IsNotEmpty()
  editora_id: string;

  @IsArray()
  @ArrayMinSize(1)
  generos: Genero[];

  @IsNotEmpty()
  @IsString()
  isbn: string;

  @IsNotEmpty()
  @IsNumber()
  qtd_paginas: number;

  @IsNotEmpty()
  publicacao: string;
}
