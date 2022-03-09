import {
  Body,
  Controller,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AllExceptionFilter } from 'src/shared/filters/http-exception.filter';
import { CodigoRepository } from './aluguel.repository';
import { AluguelService } from './aluguel.service';
import { CriarAluguelDTO } from './dtos/criar-aluguel.dto';
import { Aluguel, Codigo } from './model/aluguel.model';

@Controller('aluguel')
@ApiTags('aluguel')
export class AluguelController {
  constructor(private readonly aluguelService: AluguelService) {}

  @Post('/realizar-aluguel')
  @UseFilters(new AllExceptionFilter())
  @ApiBody({ type: CriarAluguelDTO })
  @UsePipes(ValidationPipe)
  async realizarAluguel(
    @Body() criarAluguelDTO: CriarAluguelDTO,
  ): Promise<Aluguel> {
    return await this.aluguelService.realizarAluguel(criarAluguelDTO);
  }
}
