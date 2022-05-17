import { MailService } from './../../config/utils/mail/mail.service';
import { ConsultarUsuarioPorIdService } from './../usuario/services/consultar-usuario-porId.service';
import { AluguelRepository } from './../aluguel/aluguel.repository';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import { currencyFormat } from 'src/config/utils/functions/currencyFormat';
import Stripe from 'stripe';
import { PagamentoRepository } from './pagamento.repository';

@Injectable()
export class PagamentoService {
  constructor(
    private readonly pagamentoRepository: PagamentoRepository,

    @InjectStripe() private readonly stripeClient: Stripe,

    private readonly consultarUsuarioPorIdService: ConsultarUsuarioPorIdService,

    @Inject(forwardRef(() => AluguelRepository))
    private readonly aluguelRepository: AluguelRepository,

    private readonly mailService: MailService,
  ) {}

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

    const produto = await this.stripeClient.products.create({
      name: `${aluguel.aluguel_id}-Aluguel`,
      default_price_data: {
        unit_amount: Math.round(aluguel.valor_total * 100),
        currency: 'brl',
      },
    });

    const linkDePagamento = await this.stripeClient.paymentLinks.create({
      line_items: [
        {
          price: produto.default_price.toString(),
          quantity: 1,
        },
      ],
    });

    const novoPagamento = await this.pagamentoRepository.novoPagamento({
      id: linkDePagamento.id,
      usuario_id: usuario.id,
      aluguel_id: aluguel.aluguel_id,
      valor: aluguel.valor_total,
      url_pagamento: linkDePagamento.url,
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
      to: usuario.email,
      subject: 'CODIGO e LINK para Pagamento',
      nome: usuario.nome,
      codigo: aluguel.codigo,
      link_para_pagamento: linkDePagamento.url,
    });

    return retornoLinkDePagamento;
  }
}
