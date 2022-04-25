import { AluguelRepository } from './../aluguel.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InserirLivroAluguelFinalizadoTabelaNaTabelaLivrosAlugadosFinalizadosService {
  constructor(private readonly aluguelRepository: AluguelRepository) {}

  async execute(aluguel_id: string, livros_ids: string[]): Promise<void> {
    for await (const livro_id of livros_ids) {
      await this.aluguelRepository.inserirLivrosNaTabelaLivrosAlugadosFinalizados(
        aluguel_id,
        livro_id,
      );
    }
  }
}
