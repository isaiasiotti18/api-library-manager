import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnderecoController } from './endereco.controller';
import { EnderecoRepository } from './endereco.repository';
import { EnderecoService } from './endereco.service';

@Module({
  imports: [TypeOrmModule.forFeature([EnderecoRepository]), HttpModule],
  providers: [EnderecoService],
  controllers: [EnderecoController],
})
export class EnderecoModule {}
