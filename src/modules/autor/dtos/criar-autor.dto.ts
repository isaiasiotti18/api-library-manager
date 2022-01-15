import { IsNotEmpty, IsString } from 'class-validator';

export class CriarAutorDTO {
  @IsString()
  @IsNotEmpty({ message: 'O campo nome não pode estar vazio.' })
  nome: string;
}
