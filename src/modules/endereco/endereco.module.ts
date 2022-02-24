import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnderecoController } from './endereco.controller';
import { EnderecoRepository } from './endereco.repository';
import { EnderecoService } from './endereco.service';

@Module({
  imports: [TypeOrmModule.forFeature([EnderecoRepository])],
  providers: [EnderecoService],
  controllers: [EnderecoController],
})
export class EnderecoModule {}
