import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Livro } from 'src/modules/livro/model/livro.model';

export class FinalizarAluguelDTO {
  @ArrayNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty()
  livros_devolvidos: string[];
}
