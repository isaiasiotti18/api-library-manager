import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PageOptionsDto } from 'src/shared/pagination/page-options.dto';
import { PageDto } from 'src/shared/pagination/page.dto';
import { AtualizarLivroDTO } from './dtos/atualizar-livro.dto';
import { LivroBodyJSON } from './interfaces/livro-body-json';
import { LivroResultado } from './interfaces/livro-resultado.interface';
import { LivroService } from './livro.service';
import { Livro } from './model/livro.model';
import { Express } from 'express';
import { FastifyFileInterceptor } from 'src/shared/interceptors/fastify-file-interceptor';

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

  @Put('/:isbn_livro/atualizar')
  @ApiParam({ name: 'isbn_livro' })
  @ApiBody({ type: AtualizarLivroDTO })
  @UsePipes(ValidationPipe)
  async atualizarLivro(
    @Param('isbn_livro') isbn_livro: string,
    @Body() atualizarLivroDTO: AtualizarLivroDTO,
  ): Promise<void> {
    return await this.livrosService.atualizarLivro(
      isbn_livro,
      atualizarLivroDTO,
    );
  }

  @Post('/:isbn_livro/atribuir-capa')
  @ApiParam({ name: 'isbn_livro' })
  @UsePipes(ValidationPipe)
  @UseInterceptors(FastifyFileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadCapaLivro(
    @UploadedFile() file: Express.Multer.File,
    @Param('isbn_livro') isbn_livro: string,
  ): Promise<any> {
    return await this.livrosService.uploadCapaLivro(file, isbn_livro);
  }

  @Get()
  async consultarLivros(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<LivroResultado>> {
    //limit = limit > 100 ? 100 : limit;
    return await this.livrosService.consultarLivros(pageOptionsDto);
  }

  @Get('/isbn_livro')
  @ApiQuery({ name: 'isbn_livro' })
  @UsePipes(ValidationPipe)
  async consultarLivro(
    @Query('isbn_livro') isbn_livro: string,
  ): Promise<LivroResultado> {
    return await this.livrosService.consultarLivro(isbn_livro);
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
