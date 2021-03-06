import { AuthRequest } from 'src/utils/auth/models/AuthRequest';
import { PagamentoService } from './pagamento.service';
import { Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/utils/auth/decorators/roles.decorator';
import { Role } from '../usuario/enums/role.enum';

@Controller('pagamento')
@Roles(Role.ADMINISTRADOR)
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

  @Get('lista-pagamentos')
  async listaPagamentos() {
    return await this.pagamentoService.listaPagamentos();
  }

  @Get('lista-pagamentos-multas')
  async listaPagamentosMultas() {
    return await this.pagamentoService.listaPagamentosMultas();
  }
}
