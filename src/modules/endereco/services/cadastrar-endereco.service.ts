import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { EnderecoRepository } from '../endereco.repository';
import { EnderecoBodyJson } from '../interfaces/endereco-body-json.interface';
import { Endereco } from '../model/endereco.model';
import { ResponseViaCEPJson } from '../interfaces/response-via-cep-json';

@Injectable()
export class CadastrarEnderecoService {
  private logger = new Logger(CadastrarEnderecoService.name);

  constructor(
    private readonly enderecoRepository: EnderecoRepository,
    private readonly httpService: HttpService,
  ) {}

  private async encontrarViaCEP(cep: string): Promise<ResponseViaCEPJson> {
    const getCEP = this.httpService.get(`https://viacep.com.br/ws/${cep}/json`);

    return (await getCEP.toPromise()).data;
  }

  async execute(enderecoBodyJson: EnderecoBodyJson): Promise<Endereco> {
    try {
      let { cep, numero } = enderecoBodyJson;

      const getCEP = await this.encontrarViaCEP(cep);

      const logradouro = getCEP.logradouro;
      const bairro = getCEP.bairro;
      const cidade = getCEP.localidade;
      const uf = getCEP.uf;

      const criarEndereco = await this.enderecoRepository.cadastrarEndereco({
        cep,
        logradouro,
        numero,
        bairro,
        cidade,
        uf,
      });

      return criarEndereco;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
