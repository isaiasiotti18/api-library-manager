import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AutorService } from './autor.service';
import { CriarAutorDTO } from './dtos/criar-autor.dto';
import { Autor } from './model/autor.model';

@Controller('/api/v1/autores')
@ApiTags('autores')
export class AutorController {
  constructor(private readonly autorService: AutorService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarAutor(@Body() criarAutorDTO: CriarAutorDTO): Promise<Autor> {
    return await this.autorService.criarAutor(criarAutorDTO);
  }
}
