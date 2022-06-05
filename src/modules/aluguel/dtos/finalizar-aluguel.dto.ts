import { ArrayMinSize, ArrayNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FinalizarAluguelDTO {
  @ArrayNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty()
  livros_devolvidos: string[];
}
