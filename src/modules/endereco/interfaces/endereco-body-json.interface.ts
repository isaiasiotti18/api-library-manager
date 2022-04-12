import { IsCEP } from 'brazilian-class-validator';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class EnderecoBodyJson {
  @IsNotEmpty()
  @IsCEP({ message: 'CEP inválido.' })
  cep: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Número inválido' })
  numero: number;
}
