export class CheckoutPagamentoDTO {
  stripeCustomerId: string;
  usuario_id: string;
  forma_pagamento: string;
  valor?: number;
}
