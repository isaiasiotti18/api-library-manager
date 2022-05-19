import { SendCodeForPasswordRecoveryDTO } from './dtos/send-code-for-password-recovery.dto';
import { SendEmailWithLinkAndCodeDTO } from './dtos/send-email-with-link-and-code.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendPaymentLinkForFine } from './dtos/send-payment-link-for-fine.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendCodeForPasswordRecovery({
    to,
    subject,
    codigo,
  }: SendCodeForPasswordRecoveryDTO) {
    await this.mailerService.sendMail({
      to,
      subject,
      template: 'sendEmailToRecoverPassword',
      context: {
        codigo,
      },
    });
  }

  async sendEmailWithLinkAndCode({
    to,
    subject,
    nome,
    link_para_pagamento,
    codigo,
  }: SendEmailWithLinkAndCodeDTO) {
    await this.mailerService.sendMail({
      to,
      subject,
      template: 'sendEmailWithLinkAndCode',
      context: {
        nome,
        link_para_pagamento,
        codigo,
      },
    });
  }

  async sendPaymentLinkForFine({
    to,
    subject,
    nome,
    link_para_pagamento,
  }: SendPaymentLinkForFine) {
    await this.mailerService.sendMail({
      to,
      subject,
      template: 'sendPaymentLinkForFine',
      context: {
        nome,
        link_para_pagamento,
      },
    });
  }
}
