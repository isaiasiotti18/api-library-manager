import { EntradaEstoqueDTO } from '../dto/entrada-estoque.dto';

export interface EstoqueRepositoryInterface {
  entradaEstoqueLivro(entradaEstoqueDTO: EntradaEstoqueDTO): Promise<void>;
  creditaEstoqueLivro(livro_id: string): Promise<void>;
  debitaEstoqueLivro(livro_id: string): Promise<void>;
}
