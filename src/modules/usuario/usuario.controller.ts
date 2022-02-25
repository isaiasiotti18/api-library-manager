import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CriarUsuarioDTO } from './dtos/criar-usuario.dto';
import { Usuario } from './model/usuario.model';
import { EnderecoBodyJson } from '../endereco/interfaces/endereco-body-json.interface';
import { CriarUsuarioComEnderecoBodyJson } from './interfaces/criar-usuario-endereco-bodyjson';
import { AlterarUsuarioDTO } from './dtos/alterar-usuario.dto';

@Controller('api/v1/usuarios')
@ApiTags('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @ApiBody({ type: CriarUsuarioComEnderecoBodyJson })
  async criarUsuario(
    @Body() criarUsuarioDTO: CriarUsuarioDTO,
    @Body() enderecoBodyJson: EnderecoBodyJson,
  ): Promise<Usuario> {
    return await this.usuarioService.criarUsuario(
      criarUsuarioDTO,
      enderecoBodyJson,
    );
  }

  @Put('/:id_usuario/alterar')
  @ApiParam({ name: 'id_usuario' })
  @ApiBody({ type: AlterarUsuarioDTO })
  async alterarUsuario(
    @Param('id_usuario') id_usuario: string,
    @Body() alterarUsuarioDTO: AlterarUsuarioDTO,
  ): Promise<void> {
    return await this.usuarioService.alterarUsuario(
      id_usuario,
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
}
