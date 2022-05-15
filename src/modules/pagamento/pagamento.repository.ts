import { EntityRepository, Repository } from 'typeorm';
import { NovoPagamentoDTO } from './dtos/novo-pagamento.dto';
import { Pagamento } from './model/pagamento.model';

@EntityRepository(Pagamento)
export class PagamentoRepository extends Repository<Pagamento> {
  async novoPagamento({
    id,
    usuario_id,
    aluguel_id,
    valor,
    url_pagamento,
  }: NovoPagamentoDTO): Promise<Pagamento> {
    const novoPagamento = this.create({
      id,
      usuario_id,
      aluguel_id,
      valor,
      url_pagamento,
    });

    return await this.save(novoPagamento);
  }

  async consultarPagamento(aluguel_id: string): Promise<Pagamento> {
    return await this.findOne({
      where: {
        aluguel_id,
      },
    });
  }
}
