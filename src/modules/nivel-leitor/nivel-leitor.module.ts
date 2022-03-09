import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelLeitorController } from './nivel-leitor.controller';
import { NivelLeitorRepository } from './nivel-leitor.repository';
import { NivelLeitorService } from './nivel-leitor.service';

@Module({
  imports: [TypeOrmModule.forFeature([NivelLeitorRepository])],
  controllers: [NivelLeitorController],
  providers: [NivelLeitorService],
  exports: [TypeOrmModule],
})
export class NivelLeitorModule {}
