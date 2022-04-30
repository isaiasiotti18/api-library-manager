import { RoleGuard } from './../../config/auth/guards/role.guard';
import { FinalizarAluguelDTO } from './dtos/finalizar-aluguel.dto';
import { ValidarAluguelService } from './services/validar-aluguel.service';
import { AuthRequest } from '../../config/auth/models/AuthRequest';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CriarAluguelDTO } from './dtos/criar-aluguel.dto';
import { Aluguel } from './model/aluguel.model';
import { RealizarAluguelService } from './services/realizar-aluguel.service';
import { FinalizarAluguelEDevolverLivrosService } from './services/finalizar-aluguel.service';
import { NivelAcesso } from '../usuario/enums/nivel_acesso.enum';

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
  ): Promise<Aluguel> {
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
  @UseGuards(RoleGuard(NivelAcesso.ADMINISTRADOR))
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
