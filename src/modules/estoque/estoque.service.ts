import { BadRequestException, Injectable } from '@nestjs/common';
import { EntradaEstoqueDTO } from './dto/entrada-estoque.dto';
import { EstoqueRepository } from './estoque.repository';

@Injectable()
export class EstoqueService {
  constructor(private readonly estoqueRepository: EstoqueRepository) {}

  async entradaEstoqueLivro(
    entradaEstoqueDTO: EntradaEstoqueDTO,
  ): Promise<void> {
    await this.estoqueRepository.entradaEstoqueLivro(entradaEstoqueDTO);
  }

  async creditarEstoqueLivro(livro_id: string): Promise<void> {
    const verificaEstoqueLivro = await this.estoqueRepository.consultaEstoque(
      livro_id,
    );

    if (!verificaEstoqueLivro) {
      throw new BadRequestException('Estoque inexistente.');
    }
    await this.estoqueRepository.creditarEstoqueLivro(livro_id);
  }

  async debitarEstoqueLivro(livro_id: string): Promise<void> {
    const verificaEstoqueLivro = await this.estoqueRepository.consultaEstoque(
      livro_id,
    );

    if (!verificaEstoqueLivro || verificaEstoqueLivro.qtde_livros == 0) {
      throw new BadRequestException('Estoque inexistente.');
    }

    await this.estoqueRepository.debitarEstoqueLivro(livro_id);
  }
}
