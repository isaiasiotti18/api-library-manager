import * as moment from 'moment';

export interface RetornoAluguelFinalizado {
  link_multa?: string;
  data_devolucao: moment.Moment;
  valor_da_multa: number;
  valor_total_pago: number;
  valor_total_com_multa: number;
}
