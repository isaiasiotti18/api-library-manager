import { AuthRequest } from 'src/config/utils/auth/models/AuthRequest';
import { PagamentoService } from './pagamento.service';
import { Controller, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('pagamento')
@ApiTags('pagamento')
@ApiBearerAuth('defaultBearerAuth')
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  @Post('criar-link-pagamento')
  async linkPagamento(@Req() req: AuthRequest) {
    console.log(req.user);
    return await this.pagamentoService.linkPagamento(req.user.id);
  }

  @Post('criar-link-pagamento-multa')
  async linkPagamentoMulta(@Req() req: AuthRequest) {
    return await this.pagamentoService.linkPagamentoMulta(req.user.id);
  }
}
