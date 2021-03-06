import { ListarUsuariosBloqueadosService } from './services/listar-usuarios-bloqueados.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Role } from './enums/role.enum';
import { AuthRequest } from 'src/utils/auth/models/AuthRequest';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CriarUsuarioDTO } from './dtos/criar-usuario.dto';
import { Usuario } from './model/usuario.model';
import { EnderecoBodyJson } from '../endereco/interfaces/endereco-body-json.interface';
import { CriarUsuarioComEnderecoBodyJson } from './interfaces/criar-usuario-endereco-bodyjson';
import { AlterarUsuarioDTO } from './dtos/alterar-usuario.dto';
import { IsPublic } from 'src/utils/auth/decorators/is-public.decorator';
import { CadastrarUsuarioService } from './services/cadastrar-usuario.service';
import { AlterarUsuarioService } from './services/alterar-usuario.service';
import { ConsultarUsuarioPorIdService } from './services/consultar-usuario-porId.service';
import { Roles } from 'src/utils/auth/decorators/roles.decorator';
import { GerarCodigoParaRedefinirSenhaPorEmail } from './services/gerar-codigo-para-redefinir-senha.service';
import { InserirCodigoEnviadoPorEmailParaCriarNovaSenha } from './services/inserir-codigo-enviado-por-email-nova-senha.service';
import { AtualizarSenhaDto } from './dtos/atualizar-Senha.dto';

@Controller('api/v1/usuarios')
@ApiTags('usuarios')
export class UsuarioController {
  constructor(
    private readonly cadastrarUsuarioService: CadastrarUsuarioService,
    private readonly alterarUsuarioService: AlterarUsuarioService,
    private readonly consultarUsuarioPorIdService: ConsultarUsuarioPorIdService,
    private readonly gerarCodigoParaRedefinirSenhaPorEmail: GerarCodigoParaRedefinirSenhaPorEmail,
    private readonly inserirCodigoEnviadoPorEmailParaCriarNovaSenhaService: InserirCodigoEnviadoPorEmailParaCriarNovaSenha,
    private readonly listarUsuariosBloqueadosService: ListarUsuariosBloqueadosService,
  ) {}

  @IsPublic()
  @Post('cadastrar')
  @ApiBody({ type: CriarUsuarioComEnderecoBodyJson })
  async cadastrarUsuario(
    @Body() criarUsuarioDTO: CriarUsuarioDTO,
    @Body() enderecoBodyJson: EnderecoBodyJson,
    @Req() req: Request,
  ): Promise<Usuario> {
    console.log(req.body);
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

  @IsPublic()
  @Get('/:email_usuario/gerar-codigo-redefinir-senha')
  @ApiParam({ name: 'email_usuario' })
  async gerarCodigoParaRedefinirSenha(
    @Param('email_usuario')
    email_usuario: string,
  ) {
    console.log(email_usuario);
    return await this.gerarCodigoParaRedefinirSenhaPorEmail.execute(
      email_usuario,
    );
  }

  @IsPublic()
  @Patch('/:codigo/inserir-codigo-nova-senha')
  @ApiParam({ name: 'codigo' })
  @ApiBody({ type: AtualizarSenhaDto })
  async inserirCodigoEnviadoPorEmailParaCriarNovaSenha(
    @Param('codigo') codigo: string,
    @Body() atualizarSenhaDto: AtualizarSenhaDto,
  ) {
    return await this.inserirCodigoEnviadoPorEmailParaCriarNovaSenhaService.execute(
      codigo,
      atualizarSenhaDto,
    );
  }

  @Get('lista-usuarios-bloqueados')
  @Roles(Role.ADMINISTRADOR)
  async listaUsuariosBloqueados(): Promise<Usuario[]> {
    return await this.listarUsuariosBloqueadosService.execute();
  }
}
