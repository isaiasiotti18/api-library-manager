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
  livros_devolvidos: Livro[];

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  usuario_id: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  data_devolucao: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  foi_devolvido: boolean;
}
