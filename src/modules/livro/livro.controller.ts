import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LivroRequestDTO } from './dtos/livro.request.dto';
import { LivroResponse } from './interfaces/livro-response.interface';
import { LivroService } from './livro.service';
import { Livro } from './model/livro.model';

@Controller('api/v1/livros')
export class LivroController {
  constructor(private readonly livrosService: LivroService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarLivros(@Body() livro: LivroRequestDTO): Promise<Livro> {
    return await this.livrosService.criarLivro(livro);
  }

  @Get()
  consultarLivros(): Promise<LivroResponse[]> {
    return this.livrosService.consultarLivros();
  }

  @Get('/titulo_livro')
  async consultarLivroPeloTitulo(
    @Query('titulo_livro') titulo_livro: string,
  ): Promise<Livro> {
    return await this.livrosService.consultarLivroPeloTitulo(titulo_livro);
  }

  @Get('/genero')
  async consultarLivrosPorGenero(
    @Query('genero') genero: string,
  ): Promise<LivroResponse[]> {
    return await this.livrosService.consultarLivrosPorGenero(genero);
  }

  @Post(':isbn_livro/genero/:genero')
  async atribuirGeneroALivro(@Param() params: string): Promise<void> {
    const isbn_livro = params['isbn_livro'];
    const genero = params['genero'];

    await this.livrosService.atribuirGeneroALivro(isbn_livro, genero);
  }
}
