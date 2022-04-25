import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnderecoModule } from '../endereco/endereco.module';
import { AlterarUsuarioService } from './services/alterar-usuario.service';
import { AtribuirAluguelAoUsuarioService } from './services/atribuir-aluguel.service';
import { BloquearUsuarioService } from './services/bloquear-usuario.service';
import { CadastrarUsuarioService } from './services/cadastrar-usuario.service';
import { ConsultarUsuarioPorEmailService } from './services/consultar-usuario-por-email.service';
import { ConsultarUsuarioPorIdService } from './services/consultar-usuario-porId.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioRepository]), EnderecoModule],
  controllers: [UsuarioController],
  providers: [
    CadastrarUsuarioService,
    AlterarUsuarioService,
    ConsultarUsuarioPorIdService,
    AtribuirAluguelAoUsuarioService,
    ConsultarUsuarioPorEmailService,
    BloquearUsuarioService,
  ],
  exports: [
    CadastrarUsuarioService,
    AlterarUsuarioService,
    ConsultarUsuarioPorIdService,
    AtribuirAluguelAoUsuarioService,
    ConsultarUsuarioPorEmailService,
    BloquearUsuarioService,
  ],
})
export class UsuarioModule {}
