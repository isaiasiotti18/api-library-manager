import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { EntradaEstoqueDTO } from './dto/entrada-estoque.dto';
import { EstoqueService } from './estoque.service';

@Controller('estoque')
@ApiTags('estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Post('/entrada-estoque-livro')
  @ApiBody({ type: EntradaEstoqueDTO })
  async EntradaEstoqueLivro(
    @Body() entradaEstoqueLivroDTO: EntradaEstoqueDTO,
  ): Promise<void> {
    await this.estoqueService.entradaEstoqueLivro(entradaEstoqueLivroDTO);
  }

  @Put('/:livro_id/credita-estoque-livro')
  async creditarEstoqueLivro(
    @Param('livro_id') livro_id: string,
  ): Promise<void> {
    await this.estoqueService.creditarEstoqueLivro(livro_id);
  }

  @Put('/:livro_id/debita-estoque-livro')
  async debitar(@Param('livro_id') livro_id: string): Promise<void> {
    await this.estoqueService.debitarEstoqueLivro(livro_id);
  }
}
