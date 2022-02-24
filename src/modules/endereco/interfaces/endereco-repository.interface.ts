import { CriarEnderecoDTO } from '../dtos/criar-endereco.dto';
import { Endereco } from '../model/endereco.model';
export interface EnderecoRepositoryInterface {
  criarEndereco(criarEnderecoDTO: CriarEnderecoDTO): Promise<Endereco>;
}
