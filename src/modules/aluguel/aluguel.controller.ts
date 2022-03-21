import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { AluguelService } from './aluguel.service';
import { CriarAluguelDTO } from './dtos/criar-aluguel.dto';
import { Aluguel } from './model/aluguel.model';
import { Codigo } from './model/codigo.model';

@Controller('aluguel')
@ApiTags('aluguel')
export class AluguelController {
  constructor(private readonly aluguelService: AluguelService) {}

  @Post('/realizar-aluguel')
  @ApiBody({ type: CriarAluguelDTO })
  @UsePipes(ValidationPipe)
  async realizarAluguel(
    @Body() criarAluguelDTO: CriarAluguelDTO,
  ): Promise<Aluguel> {
    return await this.aluguelService.realizarAluguel(criarAluguelDTO);
  }

  @Post('/:aluguel_id/validar-aluguel')
  @ApiBody({
    schema: {
      properties: {
        codigo: {
          type: 'string',
        },
      },
    },
  })
  @ApiParam({ name: 'aluguel_id' })
  async validarAluguel(
    @Param('aluguel_id') aluguel_id: string,
    @Body('codigo') codigo: number,
  ): Promise<any> {
    return await this.aluguelService.validarAluguel(aluguel_id, codigo);
  }

  @Get('/:aluguel_id/consulta-livros-aluguel')
  @ApiParam({ name: 'aluguel_id' })
  async consultconsultaLivrosDoAluguel(
    @Param('aluguel_id') aluguel_id: string,
  ): Promise<any> {
    return await this.aluguelService.consultaLivrosDoAluguel(aluguel_id);
  }
}
