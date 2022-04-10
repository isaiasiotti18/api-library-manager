import { AtribuirAluguelAoUsuarioService } from './../../usuario/services/atribuir-aluguel.service';
import { ConsultarLivroService } from './../../livro/services/consultar-livro.service';
import { ConsultarUsuarioPorIdService } from './../../usuario/services/consultar-usuario-porId.service';

import { AluguelRepository, CodigoRepository } from './../aluguel.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CriarAluguelDTO } from '../dtos/criar-aluguel.dto';
import { Aluguel } from '../model/aluguel.model';
import { Livro } from 'src/modules/livro/model/livro.model';
import * as moment from 'moment';

@Injectable()
export class RealizarAluguelService {
  constructor(
    private readonly atribuirAluguelAoUsuarioService: AtribuirAluguelAoUsuarioService,
    private readonly consultarUsuarioPorIdService: ConsultarUsuarioPorIdService,
    private readonly consultarLivroService: ConsultarLivroService,
    private readonly aluguelRepository: AluguelRepository,
    private readonly codigoRepository: CodigoRepository,
  ) {}

  async realizarAluguel(
    usuario_id: string,
    { isbns_passados }: CriarAluguelDTO,
  ): Promise<any> {
    try {
      //Validar o usuário que está alugando
      const usuarioJaCadastrado =
        await this.consultarUsuarioPorIdService.execute(usuario_id);

      if (!usuarioJaCadastrado) throw new BadRequestException();

      //Verificando se já tem um aluguel ativo
      if (usuarioJaCadastrado.aluguel_id) {
        //Se tiver...Irá deletar
        this.aluguelRepository
          .createQueryBuilder()
          .delete()
          .from(Aluguel)
          .where('aluguel_id = :aluguel_id', {
            aluguel_id: usuarioJaCadastrado.aluguel_id,
          })
          .execute();

        usuarioJaCadastrado.aluguel_id = null;
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

          return livros_alugados.push(livroJaCadastrado);
        } catch (error) {
          throw new BadRequestException(error);
        }
      });

      //Gerar código de aluguel
      const novoCodigoAluguel =
        await this.codigoRepository.gerarCodigoAluguel();

      //Gerar Aluguel
      let dataAtual = moment();
      let dataDevolucao = dataAtual.add(17, 'days').format('YYYY-MM-DD');

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
