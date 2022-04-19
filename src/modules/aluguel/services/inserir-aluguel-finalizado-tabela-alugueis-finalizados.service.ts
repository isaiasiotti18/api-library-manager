import { AluguelRepository } from './../aluguel.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InserirAluguelFinalizadoNaTabelaAlugueisFinalizadosService {
  constructor(private readonly aluguelRepository: AluguelRepository) {}

  async execute(aluguel_id: string, dia_finalizado: string): Promise<void> {
    const aluguel = await this.aluguelRepository.consultarAluguel(aluguel_id);

    if (aluguel) {
      await this.aluguelRepository.query(`
      INSERT INTO alugueis_finalizados(aluguel_id, usuario_id, dia_finalizado) VALUES (
        "${aluguel.aluguel_id}",
        "${aluguel.usuario_id}",
        "${dia_finalizado}"
      );
    `);
    }
  }
}
