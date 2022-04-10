import { CreditaEstoqueLivroService } from './services/credita-estoque-livro.service';
import { EntradaEstoqueLivroService } from './services/entrada-estoque-livro.service';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { EntradaEstoqueDTO } from './dto/entrada-estoque.dto';
import { Estoque } from './model/estoque.model';
import { ConsultaEstoqueService } from './services/consulta-estoque.service';
import { DebitaEstoqueLivroService } from './services/debita-estoque-livro.service';

@Controller('estoque')
@ApiTags('estoque')
@ApiBearerAuth('defaultBearerAuth')
export class EstoqueController {
  constructor(
    private readonly consultaestoqueService: ConsultaEstoqueService,
    private readonly entradaEstoqueLivroService: EntradaEstoqueLivroService,
    private readonly creditaEstoqueLivroService: CreditaEstoqueLivroService,
    private readonly debitaEstoqueLivroService: DebitaEstoqueLivroService,
  ) {}

  @Post('/entrada-estoque-livro')
  @ApiBody({ type: EntradaEstoqueDTO })
  async entradaEstoqueLivro(
    @Body() entradaEstoqueLivroDTO: EntradaEstoqueDTO,
  ): Promise<void> {
    await this.entradaEstoqueLivroService.execute(entradaEstoqueLivroDTO);
  }

  @Put('/:livro_id/credita-estoque-livro')
  async creditaEstoqueLivro(
    @Param('livro_id') livro_id: string,
  ): Promise<void> {
    await this.creditaEstoqueLivroService.execute(livro_id);
  }

  @Put('/:livro_id/debita-estoque-livro')
  async debitarEstoqueLivro(
    @Param('livro_id') livro_id: string,
  ): Promise<void> {
    await this.debitaEstoqueLivroService.execute(livro_id);
  }

  @Get('/:livro_id/consulta-estoque-livro')
  async consultaEstoqueLivro(
    @Param('livro_id') livro_id: string,
  ): Promise<Estoque> {
    return await this.consultaestoqueService.execute(livro_id);
  }
}
