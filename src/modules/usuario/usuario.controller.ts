import { AuthRequest } from './../auth/models/AuthRequest';
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
import { UsuarioService } from './usuario.service';
import { CriarUsuarioDTO } from './dtos/criar-usuario.dto';
import { Usuario } from './model/usuario.model';
import { EnderecoBodyJson } from '../endereco/interfaces/endereco-body-json.interface';
import { CriarUsuarioComEnderecoBodyJson } from './interfaces/criar-usuario-endereco-bodyjson';
import { AlterarUsuarioDTO } from './dtos/alterar-usuario.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@Controller('api/v1/usuarios')
@ApiTags('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  //@IsPublic()
  @Post()
  @ApiBody({ type: CriarUsuarioComEnderecoBodyJson })
  @UsePipes(ValidationPipe)
  async criarUsuario(
    @Body() criarUsuarioDTO: CriarUsuarioDTO,
    @Body() enderecoBodyJson: EnderecoBodyJson,
  ): Promise<Usuario> {
    return await this.usuarioService.criarUsuario(
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
    return await this.usuarioService.alterarUsuario(
      req.user.id,
      alterarUsuarioDTO,
    );
  }

  @Get('/:id_usuario/consultar')
  @ApiParam({ name: 'id_usuario' })
  async consultarUsuarioPorId(
    @Param('id_usuario') id_usuario: string,
  ): Promise<Usuario> {
    return await this.usuarioService.consultarUsuarioPorId(id_usuario);
  }

  @Get('/:id_usuario/usuario-com-endereco')
  @ApiParam({ name: 'id_usuario' })
  @UsePipes(ValidationPipe)
  async retornarUsuariocomEndereco(
    @Param('id_usuario') id_usuario: string,
  ): Promise<Usuario> {
    return await this.usuarioService.retornarUsuariocomEndereco(id_usuario);
  }
}
