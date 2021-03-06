import { ListaUfs } from '../dtos/lista-ufs.enum';

export interface ResponseViaCEPJson {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: ListaUfs;
}
