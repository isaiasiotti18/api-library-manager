import { Module } from '@nestjs/common';
import { ConnectionModule } from './config/database/typeorm/connection.module';
import { LivroModule } from './modules/livro/livro.module';
import { AutorModule } from './modules/autor/autor.module';
import { EditoraModule } from './modules/editora/editora.module';
import { GeneroModule } from './modules/genero/genero.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { EnderecoModule } from './modules/endereco/endereco.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ConnectionModule,
    LivroModule,
    AutorModule,
    EditoraModule,
    GeneroModule,
    UsuarioModule,
    EnderecoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
