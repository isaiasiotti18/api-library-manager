import { CriarEnderecoDTO } from '../dtos/criar-endereco.dto';
import { Endereco } from '../model/endereco.model';
import { EnderecoBodyJson } from './endereco-body-json.interface';
export interface EnderecoRepositoryInterface {
  criarEndereco(criarEnderecoDTO: CriarEnderecoDTO): Promise<Endereco>;
  consultarEndereco({ cep, numero }: EnderecoBodyJson): Promise<Endereco>;
}
