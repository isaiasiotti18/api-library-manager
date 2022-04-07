import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutorController } from './autor.controller';
import { ConsultarAutorService } from './services/consultar-autor.service';
import { CadastrarAutorService } from './services/cadastrar-autor.service';
import { AutorRepository } from './autor.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AutorRepository])],
  controllers: [AutorController],
  providers: [CadastrarAutorService, ConsultarAutorService],
  exports: [CadastrarAutorService, ConsultarAutorService],
})
export class AutorModule {}
