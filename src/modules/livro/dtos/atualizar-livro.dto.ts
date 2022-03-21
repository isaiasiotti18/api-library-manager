import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class AtualizarLivroDTO {
  @ApiProperty()
  @IsOptional()
  preco?: number;

  @IsOptional()
  @ApiProperty()
  urlCapaLivro?: string | '';
}
