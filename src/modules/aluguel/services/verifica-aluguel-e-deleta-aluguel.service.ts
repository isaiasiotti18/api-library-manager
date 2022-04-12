import { AluguelRepository } from './../aluguel.repository';
import { Injectable } from '@nestjs/common';
import { Aluguel } from '../model/aluguel.model';

@Injectable()
export class VerificaAluguelEDeletaAluguelService {
  constructor(private readonly aluguelRepository: AluguelRepository) {}

  async execute(aluguel_id: string) {
    if (aluguel_id) {
      //Se tiver...Irá deletar
      await this.aluguelRepository
        .createQueryBuilder()
        .delete()
        .from(Aluguel)
        .where('aluguel_id = :aluguel_id', {
          aluguel_id,
        })
        .execute();

      aluguel_id = null;
    }
  }
}
