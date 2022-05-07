import { MailModule } from './../../config/utils/mail/mail.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodigoRecuperarSenhaModule } from '../codigo_recuperar_senha/codigo_recuperar_senha.module';
import { EnderecoModule } from '../endereco/endereco.module';
import { AlterarUsuarioService } from './services/alterar-usuario.service';
import { AtribuirAluguelAoUsuarioService } from './services/atribuir-aluguel.service';
import { BloquearUsuarioService } from './services/bloquear-usuario.service';
import { CadastrarUsuarioService } from './services/cadastrar-usuario.service';
import { ConsultarUsuarioBloqueadoService } from './services/consultar-usuario-bloqueado.service';
import { ConsultarUsuarioPorEmailService } from './services/consultar-usuario-por-email.service';
import { ConsultarUsuarioPorIdService } from './services/consultar-usuario-porId.service';
import { GerarCodigoParaRedefinirSenhaPorEmail } from './services/gerar-codigo-para-redefinir-senha.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { InserirCodigoEnviadoPorEmailParaCriarNovaSenha } from './services/inserir-codigo-enviado-por-email-nova-senha.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioRepository]),
    EnderecoModule,
    CodigoRecuperarSenhaModule,
    MailModule,
  ],
  controllers: [UsuarioController],
  providers: [
    CadastrarUsuarioService,
    AlterarUsuarioService,
    ConsultarUsuarioPorIdService,
    AtribuirAluguelAoUsuarioService,
    ConsultarUsuarioPorEmailService,
    BloquearUsuarioService,
    ConsultarUsuarioBloqueadoService,
    GerarCodigoParaRedefinirSenhaPorEmail,
    InserirCodigoEnviadoPorEmailParaCriarNovaSenha,
  ],
  exports: [
    CadastrarUsuarioService,
    AlterarUsuarioService,
    ConsultarUsuarioPorIdService,
    AtribuirAluguelAoUsuarioService,
    ConsultarUsuarioPorEmailService,
    BloquearUsuarioService,
    ConsultarUsuarioBloqueadoService,
    GerarCodigoParaRedefinirSenhaPorEmail,
    InserirCodigoEnviadoPorEmailParaCriarNovaSenha,
  ],
})
export class UsuarioModule {}
