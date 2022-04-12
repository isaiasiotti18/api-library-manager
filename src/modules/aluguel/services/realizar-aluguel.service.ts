import { ConsultaEstoqueService } from './../../estoque/services/consulta-estoque.service';
import { AtribuirAluguelAoUsuarioService } from './../../usuario/services/atribuir-aluguel.service';
import { ConsultarLivroService } from './../../livro/services/consultar-livro.service';
import { ConsultarUsuarioPorIdService } from './../../usuario/services/consultar-usuario-porId.service';

import { AluguelRepository, CodigoRepository } from './../aluguel.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CriarAluguelDTO } from '../dtos/criar-aluguel.dto';
import { Livro } from 'src/modules/livro/model/livro.model';
import * as moment from 'moment';
import { NivelLeitor } from 'src/modules/usuario/enums/nivel_leitor.enum';
import { VerificaAluguelEDeletaAluguelService } from './verifica-aluguel-e-deleta-aluguel.service';

@Injectable()
export class RealizarAluguelService {
  constructor(
    private readonly atribuirAluguelAoUsuarioService: AtribuirAluguelAoUsuarioService,
    private readonly consultarUsuarioPorIdService: ConsultarUsuarioPorIdService,
    private readonly verificaAluguelEDeletaAluguelService: VerificaAluguelEDeletaAluguelService,
    private readonly consultarLivroService: ConsultarLivroService,
    private readonly aluguelRepository: AluguelRepository,
    private readonly codigoRepository: CodigoRepository,
    private readonly consultaEstoqueService: ConsultaEstoqueService,
  ) {}

  async realizarAluguel(
    usuario_id: string,
    { isbns_passados }: CriarAluguelDTO,
  ): Promise<any> {
    try {
      //Validar o usuário que está alugando
      const usuarioJaCadastrado =
        await this.consultarUsuarioPorIdService.execute(usuario_id);

      //Verificando se já tem um aluguel, se existir irá deletar
      if (usuarioJaCadastrado.aluguel_id) {
        await this.verificaAluguelEDeletaAluguelService.execute(
          usuarioJaCadastrado.aluguel_id,
        );
      }

      //Validar os livros alugados
      if (isbns_passados.length === 0)
        throw new BadRequestException(
          'Quantidade de livros não pode ser igual a 0.',
        );

      let livros_alugados: Livro[] = [];

      isbns_passados.map(async (isbn) => {
        try {
          const livroJaCadastrado = await this.consultarLivroService.execute(
            isbn,
          );

          const verificaEstoque = await this.consultaEstoqueService.execute(
            livroJaCadastrado.livro_id,
          );

          if (!verificaEstoque)
            throw new BadRequestException('Estoque zerado!');

          return livros_alugados.push(livroJaCadastrado);
        } catch (error) {
          throw new BadRequestException(error);
        }
      });

      //Gerar código de aluguel
      const novoCodigoAluguel =
        await this.codigoRepository.gerarCodigoAluguel();

      //Verificando o nível do leitor para a data de devolução do livro
      let duracaoAluguel = 0;
      switch (usuarioJaCadastrado.nivel_leitor) {
        case NivelLeitor.BRONZE:
          duracaoAluguel = 17;
          break;
        case NivelLeitor.PRATA:
          duracaoAluguel = 24;
          break;
        case NivelLeitor.OURO:
          duracaoAluguel = 31;
          break;
        case NivelLeitor.DIAMANTE:
          duracaoAluguel = 38;
          break;
      }
      let dataAtual = moment();
      let dataDevolucao = dataAtual
        .add(duracaoAluguel, 'days')
        .format('YYYY-MM-DD');

      //Gerar Aluguel
      const novoAluguel = await this.aluguelRepository.criarAluguel(
        usuario_id,
        {
          isbns_passados,
          livros_alugados,
          data_alugacao: moment().format('YYYY-MM-DD'),
          data_devolucao: dataDevolucao,
          codigo: novoCodigoAluguel.codigo,
        },
      );

      await this.atribuirAluguelAoUsuarioService.execute(
        usuario_id,
        novoAluguel.aluguel_id,
      );

      const { codigo, data_alugacao, data_devolucao, aluguel_id, livros } =
        novoAluguel;

      const valor_total = livros.reduce((accum, curr) => {
        return Number(curr.preco) + accum;
      }, 0);

      const currencyFormat = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      const retornoAluguel = {
        usuario_id,
        informacoes_aluguel: {
          aluguel_id,
          codigo,
          data_alugacao,
          data_devolucao,
        },
        livros: livros.map((livro) => livro.titulo),
        valor_total: currencyFormat.format(valor_total),
      };

      return retornoAluguel;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
