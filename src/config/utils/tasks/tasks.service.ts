import { PagamentoService } from './../../../modules/pagamento/pagamento.service';
import { BloquearUsuarioService } from './../../../modules/usuario/services/bloquear-usuario.service';
import { ConsultarUsuarioPorIdService } from 'src/modules/usuario/services/consultar-usuario-porId.service';
import { AluguelRepository } from './../../../modules/aluguel/aluguel.repository';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailService } from '../mail/mail.service';
import * as moment from 'moment';

@Injectable()
export class TasksService {
  private logger = new Logger(TasksService.name);

  constructor(
    private readonly aluguelRepository: AluguelRepository,
    private readonly consultarUsuarioPorIdService: ConsultarUsuarioPorIdService,
    private readonly bloquearUsuarioService: BloquearUsuarioService,
    private readonly pagamentoService: PagamentoService,
    private readonly mailService: MailService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async AlugueisQueJaPassaramDaDataDevolucao() {
    const idUsuarioComAluguelAtrasado: any[] = await this.aluguelRepository
      .query(`
      SELECT usuario_id, data_devolucao
      FROM aluguel 
      WHERE 
        DATEDIFF(data_devolucao, data_alugacao) >= 5 AND
        DATEDIFF(data_devolucao, data_alugacao) <= 10 AND
        status_aluguel = "EM_ANDAMENTO";
    `);

    if (idUsuarioComAluguelAtrasado.length > 0) {
      for await (const aluguel of idUsuarioComAluguelAtrasado) {
        const usuario_id = aluguel.usuario_id;
        const data_devolucao = moment(aluguel.data_devolucao).format(
          'DD/MM/YYYY',
        );

        const usuario = await this.consultarUsuarioPorIdService.execute(
          usuario_id,
        );

        await this.mailService.sendEmailMessageTimeToReturnTheBooks({
          to: `"${usuario.nome}" ${usuario.email}`,
          subject: 'A data para a devolução dos livros já passou',
          nome: usuario.nome,
          data_devolucao,
        });
      }
    }
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async AlugueisQueJaPassaramDezDiasDaDataDevolucao() {
    const idUsuarioComAluguelAtrasado: any[] = await this.aluguelRepository
      .query(`
      SELECT usuario_id, valor_total
      FROM aluguel 
      WHERE 
        DATEDIFF(data_devolucao, data_alugacao) >= 10 AND
        status_aluguel = "EM_ANDAMENTO";
    `);

    if (idUsuarioComAluguelAtrasado) {
      for await (const aluguel of idUsuarioComAluguelAtrasado) {
        const usuario = await this.consultarUsuarioPorIdService.execute(
          aluguel.usuario_id,
        );

        await this.bloquearUsuarioService.execute(usuario.id);

        const linkParaPagamento =
          await this.pagamentoService.linkPagamentoMulta(usuario.id);

        await this.mailService.sendPaymentLinkForFine({
          to: `"${usuario.nome}" ${usuario.email}`,
          subject: 'ALUGUEL DOS LIVROS EM ATRASO, NECESSÁRIO PAGAR A MULTA',
          nome: usuario.nome,
          link_para_pagamento: linkParaPagamento.url_para_pagamento,
          valor_multa: aluguel.valor_total,
        });
      }
    }
  }
}
