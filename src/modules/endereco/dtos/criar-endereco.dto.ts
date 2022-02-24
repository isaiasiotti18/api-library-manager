import { ListaUfs } from './lista-ufs.enum';

export interface CriarEnderecoDTO {
  readonly cep: string;
  readonly logradouro: string;
  readonly numero: number;
  readonly bairro: string;
  readonly cidade: string;
  readonly uf: ListaUfs;
}
