import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarEditoraDTO } from './dtos/criar-editora.dto';
import { EditoraService } from './editora.service';
import { Editora } from './model/editora.model';

@Controller('/api/v1/editoras')
export class EditoraController {
  constructor(private readonly editoraService: EditoraService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarEditora(@Body() editora: CriarEditoraDTO): Promise<Editora> {
    return await this.editoraService.criarEditora(editora);
  }
}
