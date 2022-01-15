import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LivroRequest } from './dtos/livro.request';
import { LivroService } from './livro.service';
import { Livro } from './model/livro.model';

@Controller('api/v1/livros')
export class LivroController {
  constructor(private readonly livrosService: LivroService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarLivros(@Body() livro: LivroRequest): Promise<Livro> {
    return await this.livrosService.criarLivro(livro);
  }

  @Get()
  consultarLivros(): Promise<Livro[]> {
    return this.livrosService.consultarLivros();
  }
}