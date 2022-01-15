import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutorController } from './autor.controller';
import { AutorService } from './autor.service';
import { AutorRepository } from './repositories/autor.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AutorRepository])],
  controllers: [AutorController],
  providers: [AutorService],
  exports: [TypeOrmModule],
})
export class AutorModule {}
