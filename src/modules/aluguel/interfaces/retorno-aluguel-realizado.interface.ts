export interface RetornoAluguelRealizado {
  usuario_id: string;
  informacoes_aluguel: {
    aluguel_id: string;
    codigo: number;
    data_alugacao: Date;
    data_devolucao: Date;
  };
  livros: string[];
  valor_total: string;
}
