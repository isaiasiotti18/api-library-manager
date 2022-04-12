import { ApiProperty } from '@nestjs/swagger';
import { IsCPF } from 'brazilian-class-validator';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CriarUsuarioDTO {
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio.' })
  nome: string;

  @IsEmail({ message: 'E-mail inválido.' })
  @IsNotEmpty({ message: 'Campo email não pode estar vazio.' })
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsNotEmpty({ message: 'Campo cpf não pode estar vazio.' })
  @IsCPF({ message: 'CPF inválido.' })
  cpf: string;

  @IsNotEmpty({ message: 'Campo telefone não pode estar vazio.' })
  @IsPhoneNumber('BR', { message: 'Telefone inválido.' })
  telefone: string;

  @IsOptional()
  endereco_id?: string;
}
