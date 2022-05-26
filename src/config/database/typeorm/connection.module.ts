import { CodigoRecuperarSenha } from '../../../modules/codigo_recuperar_senha/model/codigo_recuperar_senha.model';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluguel } from 'src/modules/aluguel/model/aluguel.model';
import { Codigo } from 'src/modules/aluguel/model/codigo.model';
import { Autor } from 'src/modules/autor/model/autor.model';
import { Editora } from 'src/modules/editora/model/editora.model';
import { Endereco } from 'src/modules/endereco/model/endereco.model';
import { Genero } from 'src/modules/genero/model/genero.model';
import { Livro } from 'src/modules/livro/model/livro.model';
import { Usuario } from 'src/modules/usuario/model/usuario.model';
import { Estoque } from 'src/modules/estoque/model/estoque.model';
import { Pagamento } from 'src/modules/pagamento/model/pagamento.model';

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
        Aluguel,
        Codigo,
        Estoque,
        CodigoRecuperarSenha,
        Pagamento,
      ],
    }),
  ],
  controllers: [],
  providers: [],
})
export class ConnectionModule {}
