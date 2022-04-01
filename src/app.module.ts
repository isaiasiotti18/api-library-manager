import { Module } from '@nestjs/common';
import { ConnectionModule } from './config/database/typeorm/connection.module';
import { LivroModule } from './modules/livro/livro.module';
import { AutorModule } from './modules/autor/autor.module';
import { EditoraModule } from './modules/editora/editora.module';
import { GeneroModule } from './modules/genero/genero.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { EnderecoModule } from './modules/endereco/endereco.module';
import { ConfigModule } from '@nestjs/config';
import { NivelLeitorModule } from './modules/nivel-leitor/nivel-leitor.module';
import { AluguelModule } from './modules/aluguel/aluguel.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './modules/aluguel/tasks/task.module';
import { EstoqueModule } from './modules/estoque/estoque.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TaskModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ConnectionModule,
    LivroModule,
    AutorModule,
    EditoraModule,
    GeneroModule,
    UsuarioModule,
    EnderecoModule,
    NivelLeitorModule,
    AluguelModule,
    EstoqueModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
