import { RetornoAluguelRealizado } from './interfaces/retorno-aluguel-realizado.interface';
import { FinalizarAluguelDTO } from './dtos/finalizar-aluguel.dto';
import { ValidarAluguelService } from './services/validar-aluguel.service';
import { AuthRequest } from 'src/utils/auth/models/AuthRequest';
import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CriarAluguelDTO } from './dtos/criar-aluguel.dto';
import { RealizarAluguelService } from './services/realizar-aluguel.service';
import { FinalizarAluguelEDevolverLivrosService } from './services/finalizar-aluguel.service';

@Controller('aluguel')
@ApiTags('aluguel')
@ApiBearerAuth('defaultBearerAuth')
export class AluguelController {
  constructor(
    private readonly realizarAluguelService: RealizarAluguelService,
    private readonly validarAluguelService: ValidarAluguelService,
    private readonly finalizarAluguelEDevolverLivrosService: FinalizarAluguelEDevolverLivrosService,
  ) {}

  @Post('/realizar-aluguel')
  @ApiBody({ type: CriarAluguelDTO })
  @UsePipes(ValidationPipe)
  async realizarAluguel(
    @Request() req: AuthRequest,
    @Body() criarAluguelDTO: CriarAluguelDTO,
  ): Promise<RetornoAluguelRealizado> {
    return await this.realizarAluguelService.realizarAluguel(
      req.user.id,
      criarAluguelDTO,
    );
  }

  @Post('/validar-aluguel')
  @ApiBody({
    schema: {
      properties: {
        codigo: {
          type: 'string',
        },
      },
    },
  })
  async validarAluguel(
    @Body('codigo') codigo: number,
    @Request() req: AuthRequest,
  ): Promise<any> {
    return await this.validarAluguelService.validarAluguel(req.user.id, codigo);
  }

  @Post(':aluguel_id/finalizar-aluguel')
  @ApiBody({ type: FinalizarAluguelDTO })
  async finalizarAluguel(
    @Param('aluguel_id') aluguel_id: string,
    @Body() finalizarAluguelDTO: FinalizarAluguelDTO,
  ) {
    await this.finalizarAluguelEDevolverLivrosService.execute(
      aluguel_id,
      finalizarAluguelDTO,
    );
  }
}
