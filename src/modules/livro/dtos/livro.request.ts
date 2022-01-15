import { Genero } from 'src/modules/genero/model/genero.model';

export interface LivroRequest {
  titulo: string;
  nome_editora: string;
  nome_autor: string;
  generos: Genero[];
  isbn: string;
  publicacao: string;
  qtd_paginas: number;
}
