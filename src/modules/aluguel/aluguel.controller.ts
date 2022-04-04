import { AuthRequest } from './../auth/models/AuthRequest';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { AluguelService } from './aluguel.service';
import { CriarAluguelDTO } from './dtos/criar-aluguel.dto';
import { Aluguel } from './model/aluguel.model';

@Controller('aluguel')
@ApiTags('aluguel')
@ApiBearerAuth('defaultBearerAuth')
export class AluguelController {
  constructor(private readonly aluguelService: AluguelService) {}

  @Post('/realizar-aluguel')
  @ApiBody({ type: CriarAluguelDTO })
  @UsePipes(ValidationPipe)
  async realizarAluguel(
    @Request() req: AuthRequest,
    @Body() criarAluguelDTO: CriarAluguelDTO,
  ): Promise<Aluguel> {
    return await this.aluguelService.realizarAluguel(
      req.user.id,
      criarAluguelDTO,
    );
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
