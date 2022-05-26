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

  async consultarPagamento(pagamento_id: string): Promise<Pagamento> {
    return await this.findOne({
      where: {
        id: pagamento_id,
      },
    });
  }

  async consultarPagamentoPorAluguelId(aluguel_id: string): Promise<Pagamento> {
    return await this.findOne({
      where: {
        aluguel_id,
      },
    });
  }

  async consultaPagamentoLinkMulta(
    aluguel_id: string,
    link_multa: boolean,
  ): Promise<Pagamento> {
    return await this.findOne({
      where: {
        aluguel_id,
        link_multa,
      },
    });
  }

  async atualizarPagamento(pagamento_id: string): Promise<void> {
    await this.save({
      id: pagamento_id,
      pagamento_realizado: true,
    });
  }
}
