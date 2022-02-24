import { ListaUfs } from './lista-ufs.enum';
import { IsCEP } from 'brazilian-class-validator';
import { IsNotEmpty, IsEnum, IsString } from 'class-validator';

export class CriarEnderecoDTO {
  @IsNotEmpty()
  @IsCEP()
  cep: string;

  @IsNotEmpty()
  @IsString()
  logradouro: string;

  @IsNotEmpty()
  @IsString()
  bairro: string;

  @IsNotEmpty()
  @IsString()
  cidade: string;

  @IsNotEmpty()
  @IsEnum(ListaUfs, { message: 'UF inválido.' })
  uf: ListaUfs;
}
