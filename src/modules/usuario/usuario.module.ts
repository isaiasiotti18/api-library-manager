import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnderecoModule } from '../endereco/endereco.module';
import { NivelLeitorModule } from '../nivel-leitor/nivel-leitor.module';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioService } from './usuario.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioRepository]),
    EnderecoModule,
    NivelLeitorModule,
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
