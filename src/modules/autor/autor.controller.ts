import { Role } from './../usuario/enums/role.enum';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/config/utils/auth/decorators/roles.decorator';
import { CriarAutorDTO } from './dtos/criar-autor.dto';
import { Autor } from './model/autor.model';
import { CadastrarAutorService } from './services/cadastrar-autor.service';

@Controller('/api/v1/autores')
@ApiTags('autores')
@ApiBearerAuth('defaultBearerAuth')
export class AutorController {
  constructor(private readonly cadastrarAutorService: CadastrarAutorService) {}

  @Post('cadastrar')
  @ApiBody({ type: CriarAutorDTO })
  @UsePipes(ValidationPipe)
  @Roles(Role.ADMINISTRADOR)
  async criarAutor(@Body() criarAutorDTO: CriarAutorDTO): Promise<Autor> {
    return await this.cadastrarAutorService.cadastrarAutor(criarAutorDTO);
  }
}
