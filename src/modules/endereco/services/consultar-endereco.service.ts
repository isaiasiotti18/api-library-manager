import { EnderecoRepository } from './../endereco.repository';
import { Endereco } from '../model/endereco.model';
import { EnderecoBodyJson } from './../interfaces/endereco-body-json.interface';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ConsultarEnderecoService {
  constructor(private readonly enderecoRepository: EnderecoRepository) {}

  async consultarEndereco({
    cep,
    numero,
  }: EnderecoBodyJson): Promise<Endereco> {
    const enderecoEncontrado = await this.enderecoRepository.consultarEndereco({
      cep,
      numero,
    });

    if (!enderecoEncontrado) {
      throw new NotFoundException(`Endereco não encontrado.`);
    }

    return enderecoEncontrado;
  }
}
