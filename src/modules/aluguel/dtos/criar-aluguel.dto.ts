import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Livro } from 'src/modules/livro/model/livro.model';

export class CriarAluguelDTO {
  @ArrayNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty()
  isbns_passados: string[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  usuario_id: string;

  livros_alugados: Livro[];
  data_alugacao: string;
  data_devolucao: string;
  codigo: number;
}
