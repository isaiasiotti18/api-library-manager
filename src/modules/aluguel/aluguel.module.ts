import { ValidarAluguelService } from './services/validar-aluguel.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstoqueModule } from '../estoque/estoque.module';
import { LivroModule } from '../livro/livro.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { AluguelController } from './aluguel.controller';
import { AluguelRepository, CodigoRepository } from './aluguel.repository';
import { RealizarAluguelService } from './services/realizar-aluguel.service';
import { ValidarCodigoAluguelService } from './services/validar-codigo-aluguel.service';
import { VerificaAluguelEDeletaAluguelService } from './services/verifica-aluguel-e-deleta-aluguel.service';
import { FinalizarAluguelEDevolverLivrosService } from './services/finalizar-aluguel.service';
import { InserirAluguelFinalizadoNaTabelaAlugueisFinalizadosService } from './services/inserir-aluguel-finalizado-tabela-alugueis-finalizados.service';
import { InserirLivroAluguelFinalizadoTabelaNaTabelaLivrosAlugadosFinalizadosService } from './services/inserir-livro-aluguel-finalizado-tabela-livros-alugados-finalizados.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AluguelRepository]),
    TypeOrmModule.forFeature([CodigoRepository]),
    LivroModule,
    UsuarioModule,
    EstoqueModule,
  ],
  controllers: [AluguelController],
  providers: [
    RealizarAluguelService,
    ValidarCodigoAluguelService,
    ValidarAluguelService,
    VerificaAluguelEDeletaAluguelService,
    FinalizarAluguelEDevolverLivrosService,
    InserirAluguelFinalizadoNaTabelaAlugueisFinalizadosService,
    InserirLivroAluguelFinalizadoTabelaNaTabelaLivrosAlugadosFinalizadosService,
  ],
  exports: [TypeOrmModule],
})
export class AluguelModule {}
