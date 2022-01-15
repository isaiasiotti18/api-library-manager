import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autor } from 'src/modules/autor/model/autor.model';
import { Editora } from 'src/modules/editora/model/editora.model';
import { Genero } from 'src/modules/genero/model/genero.model';
import { Livro } from 'src/modules/livro/model/livro.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database-librarymanager.catldh1cisbk.us-east-1.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'admin12345',
      database: 'dblibrarymanager',
      entities: [Livro, Genero, Autor, Editora],
    }),
  ],
  controllers: [],
  providers: [],
})
export class ConnectionModule {}
