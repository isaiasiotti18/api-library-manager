import { CriarAluguelDTO } from '../dtos/criar-aluguel.dto';
import { Aluguel } from '../model/aluguel.model';

export interface AluguelRepositoryInterface {
  criarAluguel(
    usuario_id: string,
    criarAluguelDTO: CriarAluguelDTO,
  ): Promise<Aluguel>;

  consultaLivrosDoAluguel(aluguel_id: string): Promise<any>;
}
