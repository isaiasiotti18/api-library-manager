import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { IsCPF } from 'brazilian-class-validator';

export class CriarUsuarioDTO {
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio.' })
  @ApiProperty()
  nome: string;

  @IsNotEmpty({ message: 'Campo cpf não pode estar vazio.' })
  @IsCPF({ message: 'CPF inválido.' })
  @ApiProperty()
  cpf: string;

  @IsNotEmpty({ message: 'Campo telefone não pode estar vazio.' })
  @IsPhoneNumber('BR', { message: 'Telefone inválido.' })
  @ApiProperty()
  telefone: string;

  @IsNotEmpty({ message: 'Campo endereco_id não pode estar vazio.' })
  @ApiProperty()
  endereco_id: string;

  @IsNotEmpty({ message: 'Campo email não pode estar vazio.' })
  @IsEmail({ message: 'E-mail inválido.' })
  @ApiProperty()
  email: string;
}
