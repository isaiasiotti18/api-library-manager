import { MailService } from './../../../config/utils/mail/mail.service';
import { ConsultarUsuarioPorEmailService } from 'src/modules/usuario/services/consultar-usuario-por-email.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { getRandomInt } from 'src/config/utils/functions/getRandomInt';
import { CodigoRecuperarSenhaRepository } from 'src/modules/codigo_recuperar_senha/Codigorecuperar-senha.repository';

@Injectable()
export class GerarCodigoParaRedefinirSenhaPorEmail {
  constructor(
    private readonly codigoRecuperarSenhaRepository: CodigoRecuperarSenhaRepository,
    private readonly consultarUsuarioPorEmailService: ConsultarUsuarioPorEmailService,
    private readonly mailService: MailService,
  ) {}

  async execute(email_usuario: string) {
    const consultarUsuarioPorEmail =
      await this.consultarUsuarioPorEmailService.execute(email_usuario);

    if (!consultarUsuarioPorEmail)
      throw new NotFoundException('Não existe um usuário com esse E-mail.');

    const codigoParaRecuperarSenha = getRandomInt(100000, 999999);

    const verificarSeUsuarioJaPossuiUmCodigo =
      await this.codigoRecuperarSenhaRepository.findOne({
        where: {
          email_usuario,
          valido: true,
        },
      });

    if (verificarSeUsuarioJaPossuiUmCodigo) {
      await this.codigoRecuperarSenhaRepository.save({
        codigo: verificarSeUsuarioJaPossuiUmCodigo.codigo,
        email_usuario,
        valido: false,
      });
    }

    const novoCodigoParaRecuperarSenha =
      this.codigoRecuperarSenhaRepository.create({
        email_usuario,
        codigo: codigoParaRecuperarSenha.toString(),
      });

    await this.codigoRecuperarSenhaRepository.save(
      novoCodigoParaRecuperarSenha,
    );

    await this.mailService.sendCodeForPasswordRecovery({
      to: email_usuario,
      subject: 'Token para recuperação de senha',
      codigo: codigoParaRecuperarSenha,
    });

    return {
      message: 'Verifique no seu Email o código para alteração da senha.',
    };
  }
}
