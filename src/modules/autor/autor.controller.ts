import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AutorService } from './autor.service';
import { CriarAutorDTO } from './dtos/criar-autor.dto';
import { Autor } from './model/autor.model';

@Controller('/api/v1/autores')
export class AutorController {
  constructor(private readonly autorService: AutorService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarAutor(@Body() criarAutorDTO: CriarAutorDTO): Promise<Autor> {
    return await this.autorService.criarAutor(criarAutorDTO);
  }
}
