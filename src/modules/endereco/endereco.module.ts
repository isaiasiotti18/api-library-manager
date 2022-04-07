import { ConsultarEnderecoService } from './services/consultar-endereco.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnderecoController } from './endereco.controller';
import { EnderecoRepository } from './endereco.repository';
import { CadastrarEnderecoService } from './services/cadastrar-endereco.service';

@Module({
  imports: [TypeOrmModule.forFeature([EnderecoRepository]), HttpModule],
  providers: [CadastrarEnderecoService, ConsultarEnderecoService],
  controllers: [EnderecoController],
  exports: [CadastrarEnderecoService],
})
export class EnderecoModule {}
