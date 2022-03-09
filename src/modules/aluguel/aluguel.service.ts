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
import { Aluguel } from './model/aluguel.model';
import { Livro } from '../livro/model/livro.model';
import { authenticator } from 'otplib';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AluguelService {
  constructor(
    private readonly aluguelRepository: AluguelRepository,
    private readonly codigoRepository: CodigoRepository,
    private readonly livroService: LivroService,
    private readonly usuarioService: UsuarioService,
    private readonly configService: ConfigService,
  ) {}

  async realizarAluguel(criarAluguelDTO: CriarAluguelDTO): Promise<Aluguel> {
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
        codigo_validacao_aluguel: novoCodigoAluguel.codigo,
      });

      await this.usuarioService.atribuirAluguel(
        usuario_id,
        novoAluguel.aluguel_id,
      );

      return novoAluguel;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async validarAluguel(codigo_validacao_aluguel: string): Promise<any> {
    try {
      const consultaCodigo = await this.codigoRepository.findOne({
        where: { codigo: codigo_validacao_aluguel },
      });

      if (!consultaCodigo) throw new NotFoundException('Código Invalido.');

      const SECRET_TOKEN = this.configService.get<string>('SECRET_TOKEN');

      const isValid = authenticator.check(
        codigo_validacao_aluguel,
        SECRET_TOKEN,
      );

      if (isValid) {
        await this.codigoRepository.save({
          codigo: consultaCodigo.codigo,
          validado: true,
        });

        await this.aluguelRepository.save({});
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
