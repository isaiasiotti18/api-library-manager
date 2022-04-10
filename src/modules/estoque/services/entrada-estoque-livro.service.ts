import { EstoqueRepository } from './../estoque.repository';
import { Injectable } from '@nestjs/common';
import { EntradaEstoqueDTO } from './../dto/entrada-estoque.dto';

@Injectable()
export class EntradaEstoqueLivroService {
  constructor(private readonly estoqueRepository: EstoqueRepository) {}
  async execute(entradaEstoqueDTO: EntradaEstoqueDTO): Promise<void> {
    await this.estoqueRepository.entradaEstoqueLivro(entradaEstoqueDTO);
  }
}
