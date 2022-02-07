import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneroController } from './genero.controller';
import { GeneroService } from './genero.service';
import { GeneroRepository } from './genero.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GeneroRepository])],
  controllers: [GeneroController],
  providers: [GeneroService],
  exports: [GeneroService],
})
export class GeneroModule {}
