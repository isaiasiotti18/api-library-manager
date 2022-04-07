import { CriarEnderecoDTO } from '../dtos/criar-endereco.dto';
import { Endereco } from '../model/endereco.model';
import { EnderecoBodyJson } from './endereco-body-json.interface';
export interface EnderecoRepositoryInterface {
  cadastrarEndereco(criarEnderecoDTO: CriarEnderecoDTO): Promise<Endereco>;
  consultarEndereco({ cep, numero }: EnderecoBodyJson): Promise<Endereco>;
}
