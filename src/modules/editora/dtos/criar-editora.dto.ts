import { IsNotEmpty, IsString } from 'class-validator';

export class CriarEditoraDTO {
  @IsString()
  @IsNotEmpty()
  editora: string;
}
