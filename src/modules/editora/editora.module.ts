import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EditoraController } from './editora.controller';
import { EditoraService } from './editora.service';
import { EditoraRepository } from './editora.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EditoraRepository])],
  controllers: [EditoraController],
  providers: [EditoraService],
  exports: [EditoraService],
})
export class EditoraModule {}
