import { Livro } from 'src/modules/livro/model/livro.model';

export function sumBooksValues(livros: Livro[]): number {
  return livros.reduce((accum, curr) => {
    return Number(curr.preco) + accum;
  }, 0);
}
