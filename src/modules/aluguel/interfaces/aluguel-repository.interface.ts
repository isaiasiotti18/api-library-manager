import { CriarAluguelDTO } from '../dtos/criar-aluguel.dto';
import { Aluguel } from '../model/aluguel.model';

export interface AluguelRepositoryInterface {
  criarAluguel(
    usuario_id: string,
    criarAluguelDTO: CriarAluguelDTO,
  ): Promise<Aluguel>;

  consultaLivrosDoAluguel(aluguel_id: string): Promise<string[]>;

  consultarAluguel(aluguel_id: string): Promise<Aluguel>;

  verificaAluguelEDeletaAluguelSeNaoFoiValidado(
    aluguel_id: string,
  ): Promise<void>;

  inserirLivrosNaTabelaLivrosAlugadosFinalizados(
    aluguel_id: string,
    livro_id: string,
  ): Promise<void>;

  inserirAluguelFinalizadoNaTabelaAlugueisFinalizados(
    aluguel_id: string,
    dia_finalizado: string,
  ): Promise<void>;

  removerLivrosDaTabelaLivrosAlugados(
    aluguel_id: string,
    livro_id: string,
  ): Promise<void>;
}
