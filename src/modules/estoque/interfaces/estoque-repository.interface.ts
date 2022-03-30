import { EntradaEstoqueDTO } from '../dto/entrada-estoque.dto';

export interface EstoqueRepositoryInterface {
  entradaEstoqueLivro(entradaEstoqueDTO: EntradaEstoqueDTO): Promise<void>;
  creditarEstoqueLivro(livro_id: string): Promise<void>;
  debitarEstoqueLivro(livro_id: string): Promise<void>;
}
