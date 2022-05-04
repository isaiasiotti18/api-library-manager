import { Role } from './../usuario/enums/role.enum';
import { CadastrarEditoraService } from './services/cadastrar-editora.service';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CriarEditoraDTO } from './dtos/criar-editora.dto';
import { Editora } from './model/editora.model';
import { Roles } from 'src/config/utils/auth/decorators/roles.decorator';

@Controller('/api/v1/editoras')
@ApiTags('editoras')
@ApiBearerAuth('defaultBearerAuth')
export class EditoraController {
  constructor(
    private readonly cadastrarEditoraService: CadastrarEditoraService,
  ) {}

  @Post('cadastrar')
  @UsePipes(ValidationPipe)
  @ApiBody({ type: CriarEditoraDTO })
  @Roles(Role.ADMINISTRADOR)
  async criarEditora(@Body() editora: CriarEditoraDTO): Promise<Editora> {
    return await this.cadastrarEditoraService.execute(editora);
  }
}
