import { Module } from '@nestjs/common';
import { ConnectionModule } from './config/database/typeorm/connection.module';
import { LivroModule } from './modules/livro/livro.module';
import { AutorModule } from './modules/autor/autor.module';
import { EditoraModule } from './modules/editora/editora.module';
import { GeneroModule } from './modules/genero/genero.module';

@Module({
  imports: [
    ConnectionModule,
    LivroModule,
    AutorModule,
    EditoraModule,
    GeneroModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
