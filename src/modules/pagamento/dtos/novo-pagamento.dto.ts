export class NovoPagamentoDTO {
  id: string;

  usuario_id: string;

  aluguel_id: string;

  valor: number;

  url_pagamento: string;

  link_multa?: boolean;
}
