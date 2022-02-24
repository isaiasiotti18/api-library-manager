import { Module } from '@nestjs/common';
import { ConnectionModule } from './config/database/typeorm/connection.module';
import { LivroModule } from './modules/livro/livro.module';
import { AutorModule } from './modules/autor/autor.module';
import { EditoraModule } from './modules/editora/editora.module';
import { GeneroModule } from './modules/genero/genero.module';
import { UsuarioModule } from './modules/usuario/usuario.module';

@Module({
  imports: [
    ConnectionModule,
    LivroModule,
    AutorModule,
    EditoraModule,
    GeneroModule,
    UsuarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
