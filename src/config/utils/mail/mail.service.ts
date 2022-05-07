import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendCodeForPasswordRecovery(to, subject, codigo) {
    await this.mailerService.sendMail({
      to,
      subject,
      template: 'sendEmailToRecoverPassword',
      context: {
        codigo,
      },
    });
  }
}
