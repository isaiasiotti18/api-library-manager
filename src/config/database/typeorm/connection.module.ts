import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluguel } from 'src/modules/aluguel/model/aluguel.model';
import { Codigo } from 'src/modules/aluguel/model/codigo.model';
import { Autor } from 'src/modules/autor/model/autor.model';
import { Editora } from 'src/modules/editora/model/editora.model';
import { Endereco } from 'src/modules/endereco/model/endereco.model';
import { Genero } from 'src/modules/genero/model/genero.model';
import { Livro } from 'src/modules/livro/model/livro.model';
import { NivelLeitor } from 'src/modules/nivel-leitor/model/nivel_leitor.model';
import { Usuario } from 'src/modules/usuario/model/usuario.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '172.17.0.2',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'dblibrarymanager',
      entities: [
        Livro,
        Genero,
        Autor,
        Editora,
        Usuario,
        Endereco,
        NivelLeitor,
        Aluguel,
        Codigo,
      ],
    }),
  ],
  controllers: [],
  providers: [],
})
export class ConnectionModule {}
