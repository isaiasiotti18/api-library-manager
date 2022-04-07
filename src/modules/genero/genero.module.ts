import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneroController } from './genero.controller';
import { GeneroRepository } from './genero.repository';
import { CadastrarGeneroService } from './services/cadastrar-genero.service';
import { ConsultarGeneroService } from './services/consultar-genero.service';

@Module({
  imports: [TypeOrmModule.forFeature([GeneroRepository])],
  controllers: [GeneroController],
  providers: [CadastrarGeneroService, ConsultarGeneroService],
  exports: [CadastrarGeneroService, ConsultarGeneroService],
})
export class GeneroModule {}
