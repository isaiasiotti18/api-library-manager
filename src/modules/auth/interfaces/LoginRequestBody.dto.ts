import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestBodyDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  senha: string;
}
