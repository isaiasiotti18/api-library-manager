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

import { sumBooksValues } from 'src/utils/functions/sumBooksValues';
import { currencyFormat } from 'src/utils/functions/currencyFormat';

@Injectable()
export class RealizarAluguelService {
  constructor(
    private readonly atribuirAluguelAoUsuarioService: AtribuirAluguelAoUsuarioService,
    private readonly consultarUsuarioPorIdService: ConsultarUsuarioPorIdService,
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

      //Verificando se o usuário já tem um aluguel para ser validado,
      // se existir irá deletar
      if (usuarioJaCadastrado.aluguel_id) {
        await this.aluguelRepository.verificaAluguelEDeletaAluguelSeNaoFoiValidado(
          usuarioJaCadastrado.aluguel_id,
        );
      }

      //Validar os livros alugados
      if (isbns_passados.length === 0)
        throw new BadRequestException(
          'Quantidade de livros não pode ser igual a 0.',
        );

      let livros_alugados: Livro[] = [];

      for await (const isbn_passado of isbns_passados) {
        const livroJaCadastrado = await this.consultarLivroService.execute(
          isbn_passado,
        );

        const verificaEstoque = await this.consultaEstoqueService.execute(
          livroJaCadastrado.livro_id,
        );

        if (!verificaEstoque) throw new BadRequestException('Estoque zerado!');

        livros_alugados.push(livroJaCadastrado);
      }

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

      const valores_livros = livros_alugados.map((livro) => livro);

      const valor_total = sumBooksValues(valores_livros);

      //Gerar Aluguel
      const novoAluguel = await this.aluguelRepository.criarAluguel(
        usuario_id,
        {
          isbns_passados,
          livros_alugados,
          data_alugacao: moment().format('YYYY-MM-DD'),
          data_devolucao: dataDevolucao,
          codigo: novoCodigoAluguel.codigo,
          valor_total,
        },
      );

      await this.atribuirAluguelAoUsuarioService.execute(
        usuario_id,
        novoAluguel.aluguel_id,
      );

      const { codigo, data_alugacao, data_devolucao, aluguel_id, livros } =
        novoAluguel;

      const retornoAluguel = {
        usuario_id,
        informacoes_aluguel: {
          aluguel_id,
          codigo,
          data_alugacao,
          data_devolucao,
        },
        livros: livros.map((livro) => livro.titulo),
        valor_total: currencyFormat(valor_total),
      };

      return retornoAluguel;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
