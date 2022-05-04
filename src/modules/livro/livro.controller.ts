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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/config/utils/auth/decorators/roles.decorator';
import { AtribuirGeneroALivro } from './services/atribuir-genero-a-livro.service';
import { ConsultarLivrosPorGeneroService } from './services/consultar-livros-por-genero.service';
import { ConsultarLivroService } from './services/consultar-livro.service';
import { ConsultarLivrosService } from './services/consultar-livros.service';
import { CadastrarLivroService } from './services/cadastrar-livro.service';
import { AtualizarLivroService } from './services/atualizar-livro.service';
import { UploadCapaLivroService } from './services/upload-capa-livro.service';
import { ConsultarLivrosPorTituloService } from './services/consultar-livros-por-titulo.service';
import { ConsultarLivrosPorAutorService } from './services/consultar-livros-por-autor.service';
import { ConsultarLivrosPorEditoraService } from './services/consultar-livros-por-editora.service';
import { PageOptionsDto } from 'src/config/utils/pagination/page-options.dto';
import { PageDto } from 'src/config/utils/pagination/page.dto';
import { AtualizarLivroDTO } from './dtos/atualizar-livro.dto';
import { LivroBodyJSON } from './interfaces/livro-body-json';
import { LivroResultado } from './interfaces/livro-resultado.interface';
import { Livro } from './model/livro.model';
import { Express } from 'express';
import { FastifyFileInterceptor } from 'src/config/utils/interceptors/fastify-file-interceptor';
import { IsPublic } from 'src/config/utils/auth/decorators/is-public.decorator';
import { Role } from '../usuario/enums/role.enum';

@Controller('api/v1/livros')
@ApiTags('livros')
@ApiBearerAuth('defaultBearerAuth')
export class LivroController {
  constructor(
    private readonly cadastrarLivroService: CadastrarLivroService,
    private readonly atualizarLivroService: AtualizarLivroService,
    private readonly uploadCapaLivroService: UploadCapaLivroService,
    private readonly atribuirGeneroALivroService: AtribuirGeneroALivro,
    private readonly consultarLivrosService: ConsultarLivrosService,
    private readonly consultarLivroService: ConsultarLivroService,
    private readonly consultarlivrosPorTituloService: ConsultarLivrosPorTituloService,
    private readonly consultarLivrosPorGeneroService: ConsultarLivrosPorGeneroService,
    private readonly consultarLivrosPorAutorService: ConsultarLivrosPorAutorService,
    private readonly consultarLivrosPorEditoraService: ConsultarLivrosPorEditoraService,
  ) {}

  @Post('cadastrar')
  @ApiBody({ type: LivroBodyJSON })
  @UsePipes(ValidationPipe)
  @Roles(Role.ADMINISTRADOR)
  async cadastrarLivro(@Body() livro: LivroBodyJSON): Promise<Livro> {
    return await this.cadastrarLivroService.execute(livro);
  }

  @Put('/:isbn_livro/atualizar')
  @ApiParam({ name: 'isbn_livro' })
  @ApiBody({ type: AtualizarLivroDTO })
  @UsePipes(ValidationPipe)
  @Roles(Role.ADMINISTRADOR)
  async atualizarLivro(
    @Param('isbn_livro') isbn_livro: string,
    @Body() atualizarLivroDTO: AtualizarLivroDTO,
  ): Promise<void> {
    return await this.atualizarLivroService.execute(
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
  @Roles(Role.ADMINISTRADOR)
  async uploadCapaLivro(
    @UploadedFile() file: Express.Multer.File,
    @Param('isbn_livro') isbn_livro: string,
  ): Promise<any> {
    return await this.uploadCapaLivroService.execute(file, isbn_livro);
  }

  @IsPublic()
  @Get()
  async consultarLivros(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<LivroResultado>> {
    //limit = limit > 100 ? 100 : limit;
    return await this.consultarLivrosService.execute(pageOptionsDto);
  }

  @IsPublic()
  @Get('/isbn_livro')
  @ApiQuery({ name: 'isbn_livro' })
  @UsePipes(ValidationPipe)
  async consultarLivro(
    @Query('isbn_livro') isbn_livro: string,
  ): Promise<LivroResultado> {
    return await this.consultarLivroService.execute(isbn_livro);
  }

  @IsPublic()
  @Get('/titulo_livro')
  @ApiQuery({ name: 'titulo_livro' })
  @UsePipes(ValidationPipe)
  async consultarLivrosPorTitulo(
    @Query('titulo_livro') titulo_livro: string,
  ): Promise<LivroResultado[]> {
    return await this.consultarlivrosPorTituloService.execute(titulo_livro);
  }

  @IsPublic()
  @Get('/genero')
  @ApiQuery({ name: 'genero' })
  @UsePipes(ValidationPipe)
  async consultarLivrosPorGenero(
    @Query('genero') genero: string,
  ): Promise<LivroResultado[]> {
    return await this.consultarLivrosPorGeneroService.execute(genero);
  }

  @IsPublic()
  @Get('/autor')
  @ApiQuery({ name: 'nome_autor' })
  @UsePipes(ValidationPipe)
  async consultarLivrosPorAutor(
    @Query('nome_autor') nome_autor: string,
  ): Promise<LivroResultado[]> {
    return await this.consultarLivrosPorAutorService.execute(nome_autor);
  }

  @IsPublic()
  @Get('/editora')
  @ApiQuery({ name: 'nome_editora' })
  @UsePipes(ValidationPipe)
  async consultarLivrosPorEditora(
    @Query('nome_editora') nome_editora: string,
  ): Promise<LivroResultado[]> {
    return await this.consultarLivrosPorEditoraService.execute(nome_editora);
  }

  @Post(':isbn_livro/genero/:genero')
  @UsePipes(ValidationPipe)
  @Roles(Role.ADMINISTRADOR)
  async atribuirGeneroALivro(@Param() params: string): Promise<void> {
    const isbn_livro = params['isbn_livro'];
    const genero = params['genero'];

    await this.atribuirGeneroALivroService.execute(isbn_livro, genero);
  }
}
