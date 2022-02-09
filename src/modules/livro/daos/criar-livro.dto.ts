import { Genero } from 'src/modules/genero/model/genero.model';

export interface LivroDTO {
  titulo: string;
  autor_id: string;
  editora_id: string;
  generos: Genero[];
  isbn: string;
  qtd_paginas: number;
  publicacao: string;
}
