import { FinalizarAluguelDTO } from './../dtos/finalizar-aluguel.dto';
import { ConsultarUsuarioPorIdService } from './../../usuario/services/consultar-usuario-porId.service';
import { CreditaEstoqueLivroService } from './../../estoque/services/credita-estoque-livro.service';
import { AluguelRepository } from './../aluguel.repository';
import { Injectable, BadRequestException } from '@nestjs/common';
import * as moment from 'moment';
import { compareArrays } from '../../../shared/functions/compareArrays';
import { InserirAluguelFinalizadoNaTabelaAlugueisFinalizadosService } from './inserir-aluguel-finalizado-tabela-alugueis-finalizados.service';
import { InserirLivroAluguelFinalizadoTabelaNaTabelaLivrosAlugadosFinalizadosService } from './inserir-livro-aluguel-finalizado-tabela-livros-alugados-finalizados.service';

@Injectable()
export class FinalizarAluguelEDevolverLivrosService {
  constructor(
    private readonly aluguelRepository: AluguelRepository,
    private readonly creditaEstoqueLivroService: CreditaEstoqueLivroService,
    private readonly consultarUsuarioPorIdService: ConsultarUsuarioPorIdService,
    private readonly inserirAluguelFinalizadoNaTabelaAlugueisFinalizados: InserirAluguelFinalizadoNaTabelaAlugueisFinalizadosService,
    private readonly inserirLivroAluguelFinalizadoTabelaNaTabelaLivrosAlugadosFinalizados: InserirLivroAluguelFinalizadoTabelaNaTabelaLivrosAlugadosFinalizadosService,
  ) {}

  async execute(aluguel_id: string, finalizarAluguelDTO: FinalizarAluguelDTO) {
    const dataQueOUsuarioEstaDevolvendo = moment();

    const aluguel = await this.aluguelRepository.consultarAluguel(aluguel_id);

    if (!aluguel) {
      throw new BadRequestException('Aluguel inexistente.');
    }

    const usuario = await this.consultarUsuarioPorIdService.execute(
      aluguel.usuario_id,
    );

    if (!usuario) {
      throw new BadRequestException('Aluguel inexistente.');
    }

    //Verificar se os livros foram devolvidos até a data de devolução
    const dataDevoluçãoAluguel = moment(aluguel.data_devolucao);

    const diferencaDias = dataQueOUsuarioEstaDevolvendo.diff(
      dataDevoluçãoAluguel,
      'days',
    );

    // Verificar a diferença entre as datas supera mais de 5 dias
    if (diferencaDias <= 5) {
      console.log('Ainda está dentro do aceitável');
    } else if (diferencaDias >= 10) {
      console.log('Bloquear usuário, mudando o status dele');
    } else {
      console.log('Excedeu o tempo permitido. Haverá multa');
    }

    //Verificando os livros devolvidos
    const livrosDevolvidos = finalizarAluguelDTO.livros_devolvidos;

    const consultaLivrosAluguel =
      await this.aluguelRepository.consultaLivrosDoAluguel(aluguel.aluguel_id);

    if (compareArrays(livrosDevolvidos, consultaLivrosAluguel)) {
      consultaLivrosAluguel.map(async (livro_id: string) => {
        await this.creditaEstoqueLivroService.execute(livro_id);
      });
    } else {
      throw new BadRequestException(
        'Livros devolvidos não batem com os livros do aluguel',
      );
    }

    //Mandando o aluguel finalizado para a tabela alugueis_finalizados
    await this.inserirAluguelFinalizadoNaTabelaAlugueisFinalizados.execute(
      aluguel.aluguel_id,
      dataQueOUsuarioEstaDevolvendo.format('YYYY-MM-DD'),
    );

    //Mandando os livros do aluguel finalizado para a tabela livros_alugados_finalizados
    await this.inserirLivroAluguelFinalizadoTabelaNaTabelaLivrosAlugadosFinalizados.execute(
      aluguel.aluguel_id,
      consultaLivrosAluguel,
    );
  }
}
