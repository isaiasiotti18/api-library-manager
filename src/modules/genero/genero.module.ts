import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneroController } from './genero.controller';
import { GeneroService } from './genero.service';
import { GeneroRepository } from './repositories/genero.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GeneroRepository])],
  controllers: [GeneroController],
  providers: [GeneroService],
  exports: [TypeOrmModule],
})
export class GeneroModule {}
