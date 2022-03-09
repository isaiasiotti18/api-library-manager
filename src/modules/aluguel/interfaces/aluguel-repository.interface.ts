import { CriarAluguelDTO } from '../dtos/criar-aluguel.dto';
import { Aluguel } from '../model/aluguel.model';

export interface AluguelRepositoryInterface {
  criarAluguel(criarAluguelDTO: CriarAluguelDTO): Promise<Aluguel>;
}
