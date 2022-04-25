import { AluguelRepository } from './../aluguel.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InserirAluguelFinalizadoNaTabelaAlugueisFinalizadosService {
  constructor(private readonly aluguelRepository: AluguelRepository) {}

  async execute(aluguel_id: string, dia_finalizado: string): Promise<void> {
    await this.aluguelRepository.inserirAluguelFinalizadoNaTabelaAlugueisFinalizados(
      aluguel_id,
      dia_finalizado,
    );
  }
}
