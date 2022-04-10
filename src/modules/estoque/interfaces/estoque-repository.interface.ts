import { EntradaEstoqueDTO } from '../dto/entrada-estoque.dto';
import { Estoque } from '../model/estoque.model';

export interface EstoqueRepositoryInterface {
  entradaEstoqueLivro(
    entradaEstoqueDTO: EntradaEstoqueDTO,
  ): Promise<Estoque | void>;
  creditaEstoqueLivro(livro_id: string): Promise<void>;
  debitaEstoqueLivro(livro_id: string): Promise<void>;
}
