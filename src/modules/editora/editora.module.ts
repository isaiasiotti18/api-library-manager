import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EditoraController } from './editora.controller';
import { EditoraRepository } from './editora.repository';
import { CadastrarEditoraService } from './services/cadastrar-editora.service';
import { ConsultarEditoraService } from './services/consultar-editora.service';

@Module({
  imports: [TypeOrmModule.forFeature([EditoraRepository])],
  controllers: [EditoraController],
  providers: [CadastrarEditoraService, ConsultarEditoraService],
  exports: [ConsultarEditoraService],
})
export class EditoraModule {}
