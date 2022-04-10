import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstoqueController } from './estoque.controller';
import { EstoqueRepository } from './estoque.repository';

import { CreditaEstoqueLivroService } from './services/credita-estoque-livro.service';
import { EntradaEstoqueLivroService } from './services/entrada-estoque-livro.service';
import { DebitaEstoqueLivroService } from './services/debita-estoque-livro.service';
import { ConsultaEstoqueService } from './services/consulta-estoque.service';

@Module({
  imports: [TypeOrmModule.forFeature([EstoqueRepository])],
  controllers: [EstoqueController],
  providers: [
    CreditaEstoqueLivroService,
    EntradaEstoqueLivroService,
    DebitaEstoqueLivroService,
    ConsultaEstoqueService,
  ],
  exports: [
    CreditaEstoqueLivroService,
    EntradaEstoqueLivroService,
    DebitaEstoqueLivroService,
    ConsultaEstoqueService,
  ],
})
export class EstoqueModule {}
