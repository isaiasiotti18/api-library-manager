import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CriarAutorDTO {
  @IsString()
  @IsNotEmpty({ message: 'O campo nome não pode estar vazio.' })
  @ApiProperty()
  nome: string;
}
