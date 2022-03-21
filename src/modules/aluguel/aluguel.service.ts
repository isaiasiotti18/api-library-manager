import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LivroService } from '../livro/livro.service';
import { UsuarioService } from '../usuario/usuario.service';
import { AluguelRepository, CodigoRepository } from './aluguel.repository';
import { CriarAluguelDTO } from './dtos/criar-aluguel.dto';
import * as moment from 'moment';
import { Livro } from '../livro/model/livro.model';
import { LivroRepository } from '../livro/livro.repository';
import { EstoqueService } from '../estoque/estoque.service';
import { Aluguel } from './model/aluguel.model';

@Injectable()
export class AluguelService {
  constructor(
    private readonly aluguelRepository: AluguelRepository,
    private readonly codigoRepository: CodigoRepository,
    private readonly livroService: LivroService,
    private readonly usuarioService: UsuarioService,
    private readonly estoqueService: EstoqueService,
  ) {}

  async realizarAluguel(criarAluguelDTO: CriarAluguelDTO): Promise<any> {
    try {
      const { isbns_passados, usuario_id } = criarAluguelDTO;

      //Validar o usuário que está alugando
      const usuarioJaCadastrado =
        await this.usuarioService.consultarUsuarioPorId(usuario_id);

      if (!usuarioJaCadastrado) throw new BadRequestException();

      //Verificando se já tem um aluguel ativo
      if (usuarioJaCadastrado.aluguel_id) {
        throw new BadRequestException('Usuário com aluguel já ativo.');
      }

      //Validar os livros alugados
      if (isbns_passados.length === 0)
        throw new BadRequestException(
          'Quantidade de livros não pode ser igual a 0.',
        );

      let livros_alugados: Livro[] = [];

      isbns_passados.map(async (isbn) => {
        try {
          const livroJaCadastrado = await this.livroService.consultarLivro(
            isbn,
          );

          return livros_alugados.push(livroJaCadastrado);
        } catch (error) {
          throw new BadRequestException(error.message);
        }
      });

      //Gerar código de aluguel
      const novoCodigoAluguel =
        await this.codigoRepository.gerarCodigoAluguel();

      //Gerar Aluguel
      let dataAtual = moment();
      let dataDevolucao = dataAtual.add(17, 'days').format('YYYY-MM-DD');

      const novoAluguel = await this.aluguelRepository.criarAluguel({
        usuario_id,
        isbns_passados,
        livros_alugados,
        data_alugacao: moment().format('YYYY-MM-DD'),
        data_devolucao: dataDevolucao,
        codigo: novoCodigoAluguel.codigo,
      });

      await this.usuarioService.atribuirAluguel(
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
      };

      return retornoAluguel;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async consultaLivrosDoAluguel(aluguel_id: string): Promise<Aluguel | any> {
    const consultaLivrosDoAluguel = await this.aluguelRepository.findOne({
      where: { aluguel_id },
      relations: ['livros'],
      select: ['livros'],
    });

    console.log(consultaLivrosDoAluguel);

    return consultaLivrosDoAluguel.livros.map((livro) => {
      return livro.livro_id;
    });
  }

  async validarAluguel(aluguel_id: string, codigo: number): Promise<any> {
    try {
      const consultaAluguelValidado = await this.aluguelRepository.findOne({
        where: {
          aluguel_id,
          aluguel_validado: true,
        },
      });

      if (consultaAluguelValidado) {
        throw new BadRequestException('Aluguel já válidado');
      }

      const consultaCodigo = await this.codigoRepository.findOne({
        where: { codigo },
      });

      if (!consultaCodigo) {
        throw new NotFoundException('Codigo inexistente.');
      }

      if (consultaCodigo.validado === true)
        throw new BadRequestException('Código invalido.');

      consultaCodigo.validado = true;

      await this.codigoRepository.save(consultaCodigo);

      const consultaLivrosAluguel = await this.consultaLivrosDoAluguel(
        aluguel_id,
      );

      consultaLivrosAluguel.map(async (livro_id: string) => {
        await this.estoqueService.debitarEstoqueLivro(livro_id);
      });

      return {
        statusCode: 201,
        message:
          'Código validado com sucesso! O(s) livro(s) já estão liberados para o usuário.',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
