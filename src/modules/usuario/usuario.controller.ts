import { Role } from './enums/role.enum';
import { AuthRequest } from '../../config/auth/models/AuthRequest';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarUsuarioDTO } from './dtos/criar-usuario.dto';
import { Usuario } from './model/usuario.model';
import { EnderecoBodyJson } from '../endereco/interfaces/endereco-body-json.interface';
import { CriarUsuarioComEnderecoBodyJson } from './interfaces/criar-usuario-endereco-bodyjson';
import { AlterarUsuarioDTO } from './dtos/alterar-usuario.dto';
import { IsPublic } from '../../config/auth/decorators/is-public.decorator';
import { CadastrarUsuarioService } from './services/cadastrar-usuario.service';
import { AlterarUsuarioService } from './services/alterar-usuario.service';
import { ConsultarUsuarioPorIdService } from './services/consultar-usuario-porId.service';
import { Roles } from 'src/config/auth/decorators/roles.decorator';

@Controller('api/v1/usuarios')
@ApiTags('usuarios')
export class UsuarioController {
  constructor(
    private readonly cadastrarUsuarioService: CadastrarUsuarioService,
    private readonly alterarUsuarioService: AlterarUsuarioService,
    private readonly consultarUsuarioPorIdService: ConsultarUsuarioPorIdService,
  ) {}

  @IsPublic()
  @Post('cadastrar')
  @ApiBody({ type: CriarUsuarioComEnderecoBodyJson })
  async cadastrarUsuario(
    @Body() criarUsuarioDTO: CriarUsuarioDTO,
    @Body() enderecoBodyJson: EnderecoBodyJson,
  ): Promise<Usuario> {
    return await this.cadastrarUsuarioService.execute(
      criarUsuarioDTO,
      enderecoBodyJson,
    );
  }

  @ApiBearerAuth('defaultBearerAuth')
  @Put('alterar')
  @ApiBody({ type: AlterarUsuarioDTO })
  @UsePipes(ValidationPipe)
  async alterarUsuario(
    @Request() req: AuthRequest,
    @Body() alterarUsuarioDTO: AlterarUsuarioDTO,
  ): Promise<void> {
    return await this.alterarUsuarioService.execute(
      req.user.id,
      alterarUsuarioDTO,
    );
  }

  @Get('/:id_usuario/consultar')
  @ApiParam({ name: 'id_usuario' })
  @Roles(Role.ADMINISTRADOR)
  async consultarUsuarioPorId(
    @Param('id_usuario') id_usuario: string,
  ): Promise<Usuario> {
    return await this.consultarUsuarioPorIdService.execute(id_usuario);
  }
}
