import { CadastrarEditoraService } from './services/cadastrar-editora.service';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CriarEditoraDTO } from './dtos/criar-editora.dto';
import { Editora } from './model/editora.model';

@Controller('/api/v1/editoras')
@ApiTags('editoras')
@ApiBearerAuth('defaultBearerAuth')
export class EditoraController {
  constructor(
    private readonly cadastrarEditoraService: CadastrarEditoraService,
  ) {}

  @Post('cadastrar')
  @UsePipes(ValidationPipe)
  async criarEditora(@Body() editora: CriarEditoraDTO): Promise<Editora> {
    return await this.cadastrarEditoraService.execute(editora);
  }
}
