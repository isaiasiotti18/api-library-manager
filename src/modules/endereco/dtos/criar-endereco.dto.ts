import { ListaUfs } from './lista-ufs.enum';
import { IsCEP } from 'brazilian-class-validator';
import { IsNotEmpty, IsEnum, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CriarEnderecoDTO {
  @IsNotEmpty()
  @IsCEP()
  @ApiProperty()
  cep: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly logradouro: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  numero: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly bairro: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly cidade: string;

  @IsNotEmpty()
  @IsEnum(ListaUfs, { message: 'UF inválido.' })
  @ApiProperty()
  readonly uf: ListaUfs;
}
