import { ApiProperty } from '@nestjs/swagger';

export class EntradaEstoqueDTO {
  @ApiProperty()
  livro_id: string;

  @ApiProperty()
  quantidade_livro: number;
}
