import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CriarGeneroDTO } from './dtos/criar-genero.dto';
import { GeneroService } from './genero.service';
import { Genero } from './model/genero.model';

@Controller('/api/v1/generos')
@ApiTags('generos')
@ApiBearerAuth('defaultBearerAuth')
export class GeneroController {
  constructor(private readonly generosService: GeneroService) {}

  @Post('cadastrar')
  @UsePipes(ValidationPipe)
  async criarGenero(@Body() genero: CriarGeneroDTO): Promise<Genero> {
    return await this.generosService.criarGenero(genero);
  }

  @Get('/:genero')
  async procurarGenero(@Param('genero') genero: string): Promise<Genero> {
    console.log(genero);
    return await this.generosService.procurarGenero(genero);
  }
}
