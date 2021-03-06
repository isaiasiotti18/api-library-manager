import { CadastrarUsuarioMiddleware } from './middlewares/cadastrar-usuario.middleware';
import { PagamentoModule } from './../pagamento/pagamento.module';
import { MailModule } from '../../utils/mail/mail.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  forwardRef,
} from '@nestjs/common';
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
import { ListarUsuariosBloqueadosService } from './services/listar-usuarios-bloqueados.service';
import { DesbloquearUsuarioService } from './services/desbloquear-usuario.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioRepository]),
    EnderecoModule,
    CodigoRecuperarSenhaModule,
    MailModule,
    forwardRef(() => PagamentoModule),
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
    ListarUsuariosBloqueadosService,
    DesbloquearUsuarioService,
  ],
  exports: [
    ConsultarUsuarioPorEmailService,
    CadastrarUsuarioService,
    AlterarUsuarioService,
    ConsultarUsuarioPorIdService,
    AtribuirAluguelAoUsuarioService,
    BloquearUsuarioService,
    ConsultarUsuarioBloqueadoService,
    GerarCodigoParaRedefinirSenhaPorEmail,
    InserirCodigoEnviadoPorEmailParaCriarNovaSenha,
    DesbloquearUsuarioService,
  ],
})
export class UsuarioModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CadastrarUsuarioMiddleware).forRoutes('cadastrar');
  }
}
