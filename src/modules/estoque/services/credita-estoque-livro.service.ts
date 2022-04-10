import { EstoqueRepository } from './../estoque.repository';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CreditaEstoqueLivroService {
  constructor(private readonly estoqueRepository: EstoqueRepository) {}
  async execute(livro_id: string): Promise<void> {
    await this.estoqueRepository.creditaEstoqueLivro(livro_id);
  }
}
