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
import { PageOptionsDto } from 'src/config/pagination/page-options.dto';
import { PageDto } from 'src/config/pagination/page.dto';
import { LivroBodyJSON } from './interfaces/livro-body-json';
import { LivroResultado } from './interfaces/livro-resultado.interface';
import { LivroService } from './livro.service';
import { Livro } from './model/livro.model';

@Controller('api/v1/livros')
@ApiTags('livros')
export class LivroController {
  constructor(private readonly livrosService: LivroService) {}

  @Post()
  @ApiBody({ type: LivroBodyJSON })
  @UsePipes(ValidationPipe)
  async criarLivros(@Body() livro: LivroBodyJSON): Promise<Livro> {
    return await this.livrosService.criarLivro(livro);
  }

  @Get()
  async consultarLivros(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<LivroResultado>> {
    //limit = limit > 100 ? 100 : limit;
    return await this.livrosService.consultarLivros(pageOptionsDto);
  }

  @Get('/titulo_livro')
  @ApiQuery({ name: 'titulo_livro' })
  @UsePipes(ValidationPipe)
  async consultarLivrosPorTitulo(
    @Query('titulo_livro') titulo_livro: string,
  ): Promise<LivroResultado[]> {
    return await this.livrosService.consultarLivrosPorTitulo(titulo_livro);
  }

  @Get('/genero')
  @ApiQuery({ name: 'genero' })
  @UsePipes(ValidationPipe)
  async consultarLivrosPorGenero(
    @Query('genero') genero: string,
  ): Promise<LivroResultado[]> {
    return await this.livrosService.consultarLivrosPorGenero(genero);
  }

  @Get('/autor')
  @ApiQuery({ name: 'nome_autor' })
  @UsePipes(ValidationPipe)
  async consultarLivrosPorAutor(
    @Query('nome_autor') nome_autor: string,
  ): Promise<LivroResultado[]> {
    return await this.livrosService.consultarLivrosPorAutor(nome_autor);
  }

  @Get('/editora')
  @ApiQuery({ name: 'nome_editora' })
  @UsePipes(ValidationPipe)
  async consultarLivrosPorEditora(
    @Query('nome_editora') nome_editora: string,
  ): Promise<LivroResultado[]> {
    return await this.livrosService.consultarLivrosPorEditora(nome_editora);
  }

  @Post(':isbn_livro/genero/:genero')
  @UsePipes(ValidationPipe)
  async atribuirGeneroALivro(@Param() params: string): Promise<void> {
    const isbn_livro = params['isbn_livro'];
    const genero = params['genero'];

    await this.livrosService.atribuirGeneroALivro(isbn_livro, genero);
  }
}
