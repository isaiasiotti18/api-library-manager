import { ApiProperty } from '@nestjs/swagger';
import { IsCEP } from 'brazilian-class-validator';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class EnderecoBodyJson {
  @ApiProperty()
  @IsNotEmpty()
  @IsCEP({ message: 'CEP inválido.' })
  cep: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({}, { message: 'Número inválido' })
  numero: number;
}
