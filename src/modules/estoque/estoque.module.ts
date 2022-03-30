import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstoqueController } from './estoque.controller';
import { EstoqueService } from './estoque.service';
import { EstoqueRepository } from './estoque.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EstoqueRepository])],
  controllers: [EstoqueController],
  providers: [EstoqueService],
  exports: [EstoqueService],
})
export class EstoqueModule {}
