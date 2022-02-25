import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class AlterarUsuarioDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  nome?: string;

  @ApiProperty()
  @IsPhoneNumber('BR')
  @IsOptional()
  telefone?: string;
}
