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

@Injectable()
export class AluguelService {
  constructor(
    private readonly aluguelRepository: AluguelRepository,
    private readonly codigoRepository: CodigoRepository,
    private readonly livroService: LivroService,
    private readonly usuarioService: UsuarioService,
  ) {}

  async realizarAluguel(criarAluguelDTO: CriarAluguelDTO): Promise<any> {
    try {
      const { isbns_passados, usuario_id } = criarAluguelDTO;

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

          if (livroJaCadastrado.estoque === 0)
            throw new BadRequestException('Livro indisponível no momento.');

          await this.livroService.baixarEstoqueLivro(livroJaCadastrado.isbn);

          return livros_alugados.push(livroJaCadastrado);
        } catch (error) {
          throw new BadRequestException(error.message);
        }
      });

      //Validar o usuário que está alugando
      const usuarioJaCadastrado =
        await this.usuarioService.consultarUsuarioPorId(usuario_id);

      if (!usuarioJaCadastrado) throw new BadRequestException();

      //Verificando se já tem um aluguel ativo
      if (usuarioJaCadastrado.aluguel_id) {
        throw new BadRequestException('Usuário com alguel já ativo.');
      }

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

  async validarAluguel(codigo: number): Promise<any> {
    try {
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

      return {
        statusCode: 201,
        message:
          'Código validado com sucesso! O(s) livro(s) já estão liberados para o usuário',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
