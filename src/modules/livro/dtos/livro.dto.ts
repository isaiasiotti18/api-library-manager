export interface LivroDTO {
  titulo: string;
  autor_id: string;
  editora_id: string;
  genero: string;
  isbn: string;
  qtd_paginas: number;
  publicacao: string;
  preco: number;
  capa?: string;
}
