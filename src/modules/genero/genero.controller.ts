import { RolesGuard } from './../../config/auth/guards/roles.guard';
import { CadastrarGeneroService } from './services/cadastrar-genero.service';
import { ConsultarGeneroService } from './services/consultar-genero.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  SetMetadata,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CriarGeneroDTO } from './dtos/criar-genero.dto';
import { Genero } from './model/genero.model';
import { Roles } from 'src/config/auth/decorators/roles.decorator';
import { Role } from '../usuario/enums/role.enum';

@Controller('/api/v1/generos')
@ApiTags('generos')
@ApiBearerAuth('defaultBearerAuth')
export class GeneroController {
  constructor(
    private readonly consultarGeneroService: ConsultarGeneroService,
    private readonly cadastrarGeneroService: CadastrarGeneroService,
  ) {}

  @Post('cadastrar')
  @Roles(Role.ADMINISTRADOR)
  @UsePipes(ValidationPipe)
  @ApiBody({ type: CriarGeneroDTO })
  async cadastrar(@Body() genero: CriarGeneroDTO): Promise<Genero> {
    return await this.cadastrarGeneroService.execute(genero);
  }

  @Get('/:genero')
  async consultarGenero(@Param('genero') genero: string): Promise<Genero> {
    console.log(genero);
    return await this.consultarGeneroService.execute(genero);
  }
}
