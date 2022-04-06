import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CriarEditoraDTO } from './dtos/criar-editora.dto';
import { EditoraService } from './editora.service';
import { Editora } from './model/editora.model';

@Controller('/api/v1/editoras')
@ApiTags('editoras')
@ApiBearerAuth('defaultBearerAuth')
export class EditoraController {
  constructor(private readonly editoraService: EditoraService) {}

  @Post('cadastrar')
  @UsePipes(ValidationPipe)
  async criarEditora(@Body() editora: CriarEditoraDTO): Promise<Editora> {
    return await this.editoraService.criarEditora(editora);
  }
}
