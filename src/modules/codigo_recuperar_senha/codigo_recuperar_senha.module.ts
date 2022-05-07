import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodigoRecuperarSenhaRepository } from './Codigorecuperar-senha.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CodigoRecuperarSenhaRepository])],
  exports: [TypeOrmModule],
})
export class CodigoRecuperarSenhaModule {}
