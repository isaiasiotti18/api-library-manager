import { ValidarAluguelService } from './services/validar-aluguel.service';
import { AuthRequest } from './../auth/models/AuthRequest';
import {
  Body,
  Controller,
  Post,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CriarAluguelDTO } from './dtos/criar-aluguel.dto';
import { Aluguel } from './model/aluguel.model';
import { RealizarAluguelService } from './services/realizar-aluguel.service';

@Controller('aluguel')
@ApiTags('aluguel')
@ApiBearerAuth('defaultBearerAuth')
export class AluguelController {
  constructor(
    private readonly realizarAluguelService: RealizarAluguelService,
    private readonly validarAluguelService: ValidarAluguelService,
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
}
