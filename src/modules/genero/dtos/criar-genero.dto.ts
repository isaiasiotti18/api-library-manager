import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CriarGeneroDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  genero: string;
}
