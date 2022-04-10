import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EntradaEstoqueDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  livro_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantidade_livro: number;
}
