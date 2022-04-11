import { AluguelRepository } from './../aluguel.repository';
import { Injectable } from '@nestjs/common';
import { Aluguel } from '../model/aluguel.model';
import { CreditaEstoqueLivroService } from 'src/modules/estoque/services/credita-estoque-livro.service';

@Injectable()
export class VerificaAluguelAtivoEDeletaAluguelService {
  constructor(
    private readonly aluguelRepository: AluguelRepository,
    private readonly creditaEstoqueLivroService: CreditaEstoqueLivroService,
  ) {}

  async execute(aluguel_id: string) {
    //Retornar o(s) estoque(s) do(s) livro(s) que faz parte do antigo aluguel
    const livrosDoAluguel =
      await this.aluguelRepository.consultaLivrosDoAluguel(aluguel_id);

    console.log(livrosDoAluguel);

    livrosDoAluguel.map(async (livro_id) => {
      await this.creditaEstoqueLivroService.execute(livro_id);
    });

    if (aluguel_id) {
      //Se tiver...Irá deletar
      this.aluguelRepository
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
