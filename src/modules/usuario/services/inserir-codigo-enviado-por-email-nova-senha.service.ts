import { UsuarioRepository } from './../usuario.repository';
import { AtualizarSenhaDto } from './../dtos/atualizar-Senha.dto';
import { ConsultarUsuarioPorEmailService } from 'src/modules/usuario/services/consultar-usuario-por-email.service';
import { CodigoRecuperarSenhaRepository } from 'src/modules/codigo_recuperar_senha/Codigorecuperar-senha.repository';
import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class InserirCodigoEnviadoPorEmailParaCriarNovaSenha {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly codigoRecuperarSenhaRepository: CodigoRecuperarSenhaRepository,
    private readonly consultarUsuarioPorEmailService: ConsultarUsuarioPorEmailService,
  ) {}

  async execute(codigo: string, atualizarSenhaDto: AtualizarSenhaDto) {
    const { password, confirmPassword } = atualizarSenhaDto;

    //Verificando a existencia do código e se ele ainda é valido
    const consultarCodigo = await this.codigoRecuperarSenhaRepository.findOne({
      where: {
        codigo,
        valido: true,
      },
    });

    if (!consultarCodigo) throw new BadRequestException('Código Inválido.');

    //Verificando a qual usuário o código pertence
    const consultarUsuario = await this.consultarUsuarioPorEmailService.execute(
      consultarCodigo.email_usuario,
    );

    if (!consultarUsuario)
      throw new BadRequestException('Usuário inexistente.');

    //Verificando se as senhas inseridas coincidem
    if (password === confirmPassword) {
      //Atualizar a senha no banco de dados
      await this.usuarioRepository.save({
        id: consultarUsuario.id,
        password: await bcrypt.hash(password, 10),
      });
    } else {
      throw new BadRequestException('As senhas não coincidem.');
    }

    //Invalidando o código
    await this.codigoRecuperarSenhaRepository.save({
      codigo,
      valido: false,
    });

    return {
      message: 'Sua senha foi alterada com sucesso.',
    };
  }
}
