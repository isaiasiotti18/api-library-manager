import { AuthRequest } from 'src/config/utils/auth/models/AuthRequest';
import { PagamentoService } from './pagamento.service';
import { Controller, Get, Post, Req } from '@nestjs/common';
import Stripe from 'stripe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('pagamento')
@ApiTags('pagamento')
@ApiBearerAuth('defaultBearerAuth')
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  @Post('link-pagamento')
  async linkPagamento(@Req() req: AuthRequest) {
    console.log(req.user);
    return await this.pagamentoService.linkPagamento(req.user.id);
  }
}
