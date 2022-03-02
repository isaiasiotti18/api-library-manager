import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class AtualizarLivroDTO {
  @ApiProperty()
  @IsOptional()
  preco?: number;

  @ApiProperty()
  @IsOptional()
  estoque?: number;

  @IsOptional()
  @ApiProperty()
  urlCapaLivro?: string | '';
}
