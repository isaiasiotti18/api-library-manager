import { EstoqueRepository } from './../estoque.repository';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class DebitaEstoqueLivroService {
  constructor(private readonly estoqueRepository: EstoqueRepository) {}

  async execute(livro_id: string): Promise<void> {
    const verificaEstoqueLivro = await this.estoqueRepository.consultaEstoque(
      livro_id,
    );

    if (!verificaEstoqueLivro || verificaEstoqueLivro.quantidade_livro == 0) {
      throw new BadRequestException('Estoque inexistente.');
    }

    await this.estoqueRepository.debitaEstoqueLivro(livro_id);
  }
}
