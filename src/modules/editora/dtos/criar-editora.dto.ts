import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CriarEditoraDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  editora: string;
}
