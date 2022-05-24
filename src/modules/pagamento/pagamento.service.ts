import { HttpService } from '@nestjs/axios';
import { NovoPagamentoDTO } from './dtos/novo-pagamento.dto';
import { MailService } from './../../config/utils/mail/mail.service';
import { ConsultarUsuarioPorIdService } from './../usuario/services/consultar-usuario-porId.service';
import { AluguelRepository } from './../aluguel/aluguel.repository';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import { currencyFormat } from 'src/config/utils/functions/currencyFormat';
import Stripe from 'stripe';
import { PagamentoRepository } from './pagamento.repository';
import { Pagamento } from './model/pagamento.model';

@Injectable()
export class PagamentoService {
  constructor(
    private readonly pagamentoRepository: PagamentoRepository,

    @InjectStripe() private readonly stripeClient: Stripe,

    private readonly consultarUsuarioPorIdService: ConsultarUsuarioPorIdService,

    @Inject(forwardRef(() => AluguelRepository))
    private readonly aluguelRepository: AluguelRepository,

    private readonly mailService: MailService,

    private readonly httpService: HttpService,
  ) {}

  async criarProduto(
    nome_produto: string,
    valor_produto: number,
  ): Promise<Stripe.Response<Stripe.Product>> {
    const produto = await this.stripeClient.products.create({
      name: nome_produto,
      default_price_data: {
        unit_amount: Math.round(valor_produto * 100),
        currency: 'brl',
      },
    });

    return produto;
  }

  async linkPagamento(usuario_id: string) {
    const usuario = await this.consultarUsuarioPorIdService.execute(usuario_id);

    const aluguel = await this.aluguelRepository.consultarAluguel(
      usuario.aluguel_id,
    );

    //Verificar se o aluguel em questão já tem um link de pagamento gerado
    const consultaPagamento = await this.pagamentoRepository.consultarPagamento(
      aluguel.aluguel_id,
    );

    if (consultaPagamento) {
      return {
        message:
          'Esse aluguel já possui uma LINK de Pagamento, porém ainda não foi pago.',
        url: consultaPagamento.url_pagamento,
      };
    }

    const produto = await this.criarProduto(
      `${aluguel.aluguel_id}-Aluguel`,
      aluguel.valor_total,
    );

    const linkDePagamento = await this.stripeClient.paymentLinks.create({
      line_items: [
        {
          price: produto.default_price.toString(),
          quantity: 1,
        },
      ],
      metadata: {
        usuario_id: usuario.id,
      },
    });

    // CriarNovoPagamento
    const novoPagamento = await this.novoPagamento({
      aluguel_id: aluguel.aluguel_id,
      usuario_id: usuario.id,
      id: linkDePagamento.id,
      url_pagamento: linkDePagamento.url,
      valor: aluguel.valor_total,
    });

    const retornoLinkDePagamento = {
      id: linkDePagamento.id,
      url_para_pagamento: linkDePagamento.url,
      valor_total: currencyFormat(aluguel.valor_total),
      novo_pagamento: {
        usuario_id: novoPagamento.usuario_id,
        aluguel_id: novoPagamento.aluguel_id,
        pagamento_realizado: novoPagamento.pagamento_realizado,
      },
    };

    await this.mailService.sendEmailWithLinkAndCode({
      to: `"${usuario.nome}" ${usuario.email}`,
      subject: 'CODIGO e LINK para Pagamento',
      nome: usuario.nome,
      codigo: aluguel.codigo,
      link_para_pagamento: linkDePagamento.url,
    });

    return retornoLinkDePagamento;
  }

  async linkPagamentoMulta(usuario_id: string) {
    const usuario = await this.consultarUsuarioPorIdService.execute(usuario_id);

    const aluguel = await this.aluguelRepository.consultarAluguel(
      usuario.aluguel_id,
    );

    const produto = await this.criarProduto(
      `${aluguel.aluguel_id}-Multa-Aluguel`,
      aluguel.valor_total * 0.1,
    );

    const linkDePagamento = await this.stripeClient.paymentLinks.create({
      line_items: [
        {
          price: produto.default_price.toString(),
          quantity: 1,
        },
      ],
      metadata: {
        usuario_id: usuario.id,
      },
    });

    const consultaPagamentoLinkMulta = await this.pagamentoRepository.findOne({
      where: {
        aluguel_id: aluguel.aluguel_id,
        link_multa: true,
      },
    });

    if (consultaPagamentoLinkMulta) {
      return {
        message: 'Esse Aluguel já possui um link de pagamento para multa.',
        url_para_pagamento: consultaPagamentoLinkMulta.url_pagamento,
      };
    }

    const novoPagamento = await this.novoPagamento({
      aluguel_id: aluguel.aluguel_id,
      usuario_id: usuario.id,
      id: linkDePagamento.id,
      url_pagamento: linkDePagamento.url,
      link_multa: true,
      valor: aluguel.valor_total,
    });

    const retornoLinkDePagamento = {
      id: linkDePagamento.id,
      url_para_pagamento: linkDePagamento.url,
      valor_total: currencyFormat(aluguel.valor_total),
      novo_pagamento: {
        usuario_id: novoPagamento.usuario_id,
        aluguel_id: novoPagamento.aluguel_id,
        pagamento_realizado: novoPagamento.pagamento_realizado,
      },
    };

    return retornoLinkDePagamento;
  }

  async novoPagamento({
    aluguel_id,
    id,
    url_pagamento,
    usuario_id,
    valor,
    link_multa,
  }: NovoPagamentoDTO): Promise<Pagamento> {
    const novoPagamento = await this.pagamentoRepository.novoPagamento({
      id,
      usuario_id,
      aluguel_id,
      valor,
      url_pagamento,
      link_multa,
    });

    return novoPagamento;
  }

  async listaPagamentos() {
    const balanceTransactions =
      await this.stripeClient.balanceTransactions.list({
        limit: 3,
      });

    return balanceTransactions;
  }
}
