import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CriarAutorDTO } from './dtos/criar-autor.dto';
import { Autor } from './model/autor.model';
import { CadastrarAutorService } from './services/cadastrar-autor.service';
@Controller('/api/v1/autores')
@ApiTags('autores')
@ApiBearerAuth('defaultBearerAuth')
export class AutorController {
  constructor(private readonly cadastrarAutorService: CadastrarAutorService) {}

  @Post('cadastrar')
  @UsePipes(ValidationPipe)
  async criarAutor(@Body() criarAutorDTO: CriarAutorDTO): Promise<Autor> {
    return await this.cadastrarAutorService.cadastrarAutor(criarAutorDTO);
  }
}
