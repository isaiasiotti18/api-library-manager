import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livro } from 'src/modules/livros/model/livro.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [Livro],
    }),
  ],
  controllers: [],
  providers: [],
})
export class ConnectionModule {}
