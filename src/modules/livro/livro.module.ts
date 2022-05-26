import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutorModule } from '../autor/autor.module';
import { EditoraModule } from '../editora/editora.module';
import { GeneroModule } from '../genero/genero.module';
import { LivroController } from './livro.controller';
import { LivroRepository } from './livro.repository';
import { AwsModule } from 'src/utils/aws/aws.module';
import { EstoqueModule } from '../estoque/estoque.module';

import { ConsultarLivroService } from './services/consultar-livro.service';
import { CadastrarLivroService } from './services/cadastrar-livro.service';
import { AtualizarLivroService } from './services/atualizar-livro.service';
import { UploadCapaLivroService } from './services/upload-capa-livro.service';
import { AtribuirGeneroALivro } from './services/atribuir-genero-a-livro.service';
import { ConsultarLivrosPorTituloService } from './services/consultar-livros-por-titulo.service';
import { ConsultarLivrosPorGeneroService } from './services/consultar-livros-por-genero.service';
import { ConsultarLivrosService } from './services/consultar-livros.service';
import { ConsultarLivrosPorAutorService } from './services/consultar-livros-por-autor.service';
import { ConsultarLivrosPorEditoraService } from './services/consultar-livros-por-editora.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LivroRepository]),
    AutorModule,
    EditoraModule,
    GeneroModule,
    AwsModule,
    EstoqueModule,
  ],
  controllers: [LivroController],
  providers: [
    ConsultarLivroService,
    ConsultarLivrosService,
    CadastrarLivroService,
    AtualizarLivroService,
    UploadCapaLivroService,
    AtribuirGeneroALivro,
    ConsultarLivrosPorTituloService,
    ConsultarLivrosPorGeneroService,
    ConsultarLivrosPorAutorService,
    ConsultarLivrosPorEditoraService,
  ],
  exports: [ConsultarLivroService, TypeOrmModule],
})
export class LivroModule {}
