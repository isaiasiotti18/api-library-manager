import { EntityRepository, Repository } from 'typeorm';
import { Endereco } from './model/endereco.model';
import { EnderecoRepositoryInterface } from './interfaces/endereco-repository.interface';
import { CriarEnderecoDTO } from './dtos/criar-endereco.dto';

@EntityRepository(Endereco)
export class EnderecoRepository
  extends Repository<Endereco>
  implements EnderecoRepositoryInterface
{
  async criarEndereco(criarEnderecoDTO: CriarEnderecoDTO): Promise<Endereco> {
    const novoEndereco = this.create(criarEnderecoDTO);

    return await this.save(novoEndereco);
  }
}
