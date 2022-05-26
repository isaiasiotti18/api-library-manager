import { DesbloquearUsuarioService } from '../../modules/usuario/services/desbloquear-usuario.service';
import { PagamentoService } from '../../modules/pagamento/pagamento.service';
import { BloquearUsuarioService } from '../../modules/usuario/services/bloquear-usuario.service';
import { ConsultarUsuarioPorIdService } from 'src/modules/usuario/services/consultar-usuario-porId.service';
import { AluguelRepository } from '../../modules/aluguel/aluguel.repository';
import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailService } from '../mail/mail.service';
import * as moment from 'moment';

@Injectable()
export class TasksService {
  private logger = new Logger(TasksService.name);

  constructor(
    private readonly aluguelRepository: AluguelRepository,
    private readonly consultarUsuarioPorIdService: ConsultarUsuarioPorIdService,
    private readonly desbloquearUsuarioService: DesbloquearUsuarioService,
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

        await this.mailService.sendEmailTimeToReturnTheBooks({
          to: `"${usuario.nome}" ${usuario.email}`,
          subject: 'A data para a devolução dos livros já passou',
          nome: usuario.nome,
          data_devolucao,
        });
      }
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
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

  @Cron(CronExpression.EVERY_HOUR)
  async conferindoPagamentosDeMultasDesbloqueandoUsuarios() {
    try {
      const pagamentos = await this.pagamentoService.listaPagamentosMultas();

      if (pagamentos.length > 0) {
        this.logger.log('Conferindo lista de pagantes...');
        this.logger.log('Liberando usuários no sistema...');
        this.logger.log('Enviando Emails de Aviso...');
        for await (const pagamento of pagamentos) {
          const usuario_id = pagamento.metadata.usuario_id;
          const email = pagamento.metadata.email;
          const nome = pagamento.metadata.nome;
          const pagamento_id = pagamento.payment_intent;

          await this.desbloquearUsuarioService.execute(usuario_id);

          await this.mailService.sendEmailToUsersBeingUnblockedFromTheSystem({
            to: email,
            subject: 'Desbloqueio de Conta',
            nome,
          });

          await this.pagamentoService.atualizarPagamento(
            pagamento_id.toString(),
          );
        }
      }
    } catch (error: any) {
      throw new BadRequestException(error?.message);
    }
  }
}
