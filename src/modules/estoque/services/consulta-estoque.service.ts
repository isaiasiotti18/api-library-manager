import { BadRequestException, Injectable } from '@nestjs/common';
import { EstoqueRepository } from '../estoque.repository';
import { Estoque } from '../model/estoque.model';

@Injectable()
export class ConsultaEstoqueService {
  constructor(private readonly estoqueRepository: EstoqueRepository) {}

  async execute(livro_id: string): Promise<Estoque> {
    const consultaEstoque = await this.estoqueRepository.consultaEstoque(
      livro_id,
    );

    console.log('consultaEstoque', consultaEstoque);
    return consultaEstoque;
  }
}
