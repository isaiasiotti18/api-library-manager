import { BloquearUsuarioService } from './../../usuario/services/bloquear-usuario.service';
import { FinalizarAluguelDTO } from './../dtos/finalizar-aluguel.dto';
import { ConsultarUsuarioPorIdService } from './../../usuario/services/consultar-usuario-porId.service';
import { CreditaEstoqueLivroService } from './../../estoque/services/credita-estoque-livro.service';
import { AluguelRepository } from './../aluguel.repository';
import { Injectable, BadRequestException } from '@nestjs/common';
import * as moment from 'moment';
import { compareArrays } from 'src/config/utils/functions/compareArrays';
import { InserirLivroAluguelFinalizadoTabelaNaTabelaLivrosAlugadosFinalizadosService } from './inserir-livro-aluguel-finalizado-tabela-livros-alugados-finalizados.service';
import { StatusAluguel } from '../enums/status_aluguel';
import { RetornoAluguelFinalizado } from '../interfaces/retorno-aluguel-finalizado';

@Injectable()
export class FinalizarAluguelEDevolverLivrosService {
  constructor(
    private readonly aluguelRepository: AluguelRepository,
    private readonly creditaEstoqueLivroService: CreditaEstoqueLivroService,
    private readonly consultarUsuarioPorIdService: ConsultarUsuarioPorIdService,
    private readonly inserirLivroAluguelFinalizadoTabelaNaTabelaLivrosAlugadosFinalizados: InserirLivroAluguelFinalizadoTabelaNaTabelaLivrosAlugadosFinalizadosService,
    private readonly bloquearUsuarioService: BloquearUsuarioService,
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
      throw new BadRequestException('Usuário não encontrado.');
    }

    //Verificar se os livros foram devolvidos até a data de devolução
    const dataDevoluçãoAluguel = moment(aluguel.data_devolucao);

    const diferencaDias = dataQueOUsuarioEstaDevolvendo.diff(
      dataDevoluçãoAluguel,
      'days',
    );

    // Verificar a diferença entre as datas supera mais de 5 dias
    if (diferencaDias <= 5) {
      // AQUI VOU MANDAR MENSAGENS PARA
      // O USUARIO FALANDO QUE JÁ PASSOU DA DATA DE DEVOLVER
    } else if (diferencaDias >= 10) {
      // AQUI VOU MANDAR MENSAGEM PARA O USUÁRIO FALANDO QUE JÁ EXCEDEU O LIMITE

      // SERÁ GERADO UM LINK PARA PAGAR A MULTA

      // O USUÁRIO TERA A CONTA BLOQUEADA
      await this.bloquearUsuarioService.execute(usuario.id);
    }

    //Verificando os livros devolvidos
    const livrosDevolvidos = finalizarAluguelDTO.livros_devolvidos;

    const livrosDoAluguel =
      await this.aluguelRepository.consultaLivrosDoAluguel(aluguel.aluguel_id);

    const verificandoOsLivrosDevolvidosBatem = compareArrays(
      livrosDevolvidos,
      livrosDoAluguel,
    );

    if (verificandoOsLivrosDevolvidosBatem) {
      livrosDoAluguel.map(async (livro_id: string) => {
        await this.creditaEstoqueLivroService.execute(livro_id);
      });
    } else {
      throw new BadRequestException(
        'Livros devolvidos não batem com os livros do aluguel',
      );
    }

    await this.aluguelRepository.inserirAluguelFinalizadoNaTabelaAlugueisFinalizados(
      aluguel.aluguel_id,
      dataQueOUsuarioEstaDevolvendo.format('YYYY-MM-DD'),
    );

    //Mandando os livros do aluguel finalizado para a tabela livros_alugados_finalizados
    await this.inserirLivroAluguelFinalizadoTabelaNaTabelaLivrosAlugadosFinalizados.execute(
      aluguel.aluguel_id,
      livrosDoAluguel,
    );

    await this.aluguelRepository.save({
      aluguel_id: aluguel.aluguel_id,
      status_aluguel: StatusAluguel.FINALIZADO,
    });

    const retornoAluguelFinalizado: RetornoAluguelFinalizado = {
      data_devolucao: dataDevoluçãoAluguel,
      link_multa: '',
      valor_total_pago: aluguel.valor_total,
      valor_da_multa: 0.1 * aluguel.valor_total,
      valor_total_com_multa: 0.1 * aluguel.valor_total + aluguel.valor_total,
    };

    return retornoAluguelFinalizado;
  }
}
