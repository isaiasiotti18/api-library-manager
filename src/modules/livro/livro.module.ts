import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutorModule } from '../autor/autor.module';
import { EditoraModule } from '../editora/editora.module';
import { GeneroModule } from '../genero/genero.module';
import { LivroController } from './livro.controller';
import { LivroService } from './livro.service';
import { LivroRepository } from './livro.repository';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LivroRepository]),
    AutorModule,
    EditoraModule,
    GeneroModule,
    AwsModule,
  ],
  controllers: [LivroController],
  providers: [LivroService],
  exports: [LivroService],
})
export class LivroModule {}
