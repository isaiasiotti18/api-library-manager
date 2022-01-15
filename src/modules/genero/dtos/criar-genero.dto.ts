import { IsString, IsNotEmpty } from 'class-validator';

export class CriarGeneroDTO {
  @IsString()
  @IsNotEmpty()
  genero: string;
}
