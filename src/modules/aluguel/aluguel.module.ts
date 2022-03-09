import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivroModule } from '../livro/livro.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { AluguelController } from './aluguel.controller';
import { AluguelRepository, CodigoRepository } from './aluguel.repository';
import { AluguelService } from './aluguel.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AluguelRepository]),
    TypeOrmModule.forFeature([CodigoRepository]),
    LivroModule,
    UsuarioModule,
  ],
  controllers: [AluguelController],
  providers: [AluguelService],
})
export class AluguelModule {}
