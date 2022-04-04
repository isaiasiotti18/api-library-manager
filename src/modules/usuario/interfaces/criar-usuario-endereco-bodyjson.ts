import { ApiProperty } from '@nestjs/swagger';

export class CriarUsuarioComEnderecoBodyJson {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  senha: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  telefone: string;

  @ApiProperty()
  cep: string;

  @ApiProperty()
  numero: number;
}
