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
import { ApiBody, ApiTags } from '@nestjs/swagger';
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
  @UsePipes(ValidationPipe)
  async consultarLivroPeloTitulo(
    @Query('titulo_livro') titulo_livro: string,
  ): Promise<LivroResultado[]> {
    return await this.livrosService.consultarLivroPeloTitulo(titulo_livro);
  }

  @Get('/genero')
  async consultarLivrosPorGenero(
    @Query('genero') genero: string,
  ): Promise<LivroResultado[]> {
    return await this.livrosService.consultarLivrosPorGenero(genero);
  }

  @Post(':isbn_livro/genero/:genero')
  async atribuirGeneroALivro(@Param() params: string): Promise<void> {
    const isbn_livro = params['isbn_livro'];
    const genero = params['genero'];

    await this.livrosService.atribuirGeneroALivro(isbn_livro, genero);
  }
}
