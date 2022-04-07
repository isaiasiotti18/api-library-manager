import { CodigoRepository } from './../aluguel.repository';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidarCodigoAluguelService {
  constructor(private readonly codigoRepository: CodigoRepository) {}

  async validarCodigoAluguel(codigo: number): Promise<void> {
    const consultaCodigo = await this.codigoRepository.consultarCodigo(codigo);

    if (!consultaCodigo) {
      throw new BadRequestException('Erro ao validar o código');
    }

    await this.codigoRepository.validaCodigoAluguel(consultaCodigo);
  }
}
