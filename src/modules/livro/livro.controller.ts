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
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { LivroRequestDTO } from './dtos/livro.request.dto';
import { LivroResultado } from './interfaces/livro-response.interface';
import { LivroService } from './livro.service';
import { Livro } from './model/livro.model';

@Controller('api/v1/livros')
export class LivroController {
  constructor(private readonly livrosService: LivroService) {}

  @Post()
  @ApiTags('livros')
  @ApiBody({ type: LivroRequestDTO })
  @UsePipes(ValidationPipe)
  async criarLivros(@Body() livro: LivroRequestDTO): Promise<Livro> {
    return await this.livrosService.criarLivro(livro);
  }

  @Get()
  @ApiTags('livros')
  async consultarLivros(): Promise<LivroResultado[]> {
    //limit = limit > 100 ? 100 : limit;
    return await this.livrosService.consultarLivros();
  }

  @Get('/titulo_livro')
  @ApiTags('livros')
  @UsePipes(ValidationPipe)
  async consultarLivroPeloTitulo(
    @Query('titulo_livro') titulo_livro: string,
  ): Promise<LivroResultado[]> {
    return await this.livrosService.consultarLivroPeloTitulo(titulo_livro);
  }

  @Get('/genero')
  @ApiTags('livros')
  async consultarLivrosPorGenero(
    @Query('genero') genero: string,
  ): Promise<LivroResultado[]> {
    return await this.livrosService.consultarLivrosPorGenero(genero);
  }

  @Post(':isbn_livro/genero/:genero')
  @ApiTags('livros')
  async atribuirGeneroALivro(@Param() params: string): Promise<void> {
    const isbn_livro = params['isbn_livro'];
    const genero = params['genero'];

    await this.livrosService.atribuirGeneroALivro(isbn_livro, genero);
  }
}
