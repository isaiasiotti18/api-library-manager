import { EntityRepository, Repository } from 'typeorm';
import { CriarAluguelDTO } from './dtos/criar-aluguel.dto';
import { AluguelRepositoryInterface } from './interfaces/aluguel-repository.interface';
import { Aluguel } from './model/aluguel.model';
import { Codigo } from './model/codigo.model';
import * as moment from 'moment';
import { authenticator } from 'otplib';
import { ConfigService } from '@nestjs/config';

@EntityRepository(Aluguel)
export class AluguelRepository
  extends Repository<Aluguel>
  implements AluguelRepositoryInterface
{
  async consultarAluguel(aluguel_id: string): Promise<Aluguel> {
    return await this.findOne({
      where: { aluguel_id },
    });
  }

  async criarAluguel(
    usuario_id: string,
    criarAluguelDTO: CriarAluguelDTO,
  ): Promise<Aluguel> {
    const {
      livros_alugados,
      codigo,
      data_alugacao,
      data_devolucao,
      valor_total,
    } = criarAluguelDTO;

    const novoAluguel = this.create({
      usuario_id,
      codigo,
      data_alugacao,
      data_devolucao,
      valor_total,
    });

    novoAluguel.livros = livros_alugados;

    return await this.save(novoAluguel);
  }

  async consultaLivrosDoAluguel(aluguel_id: string): Promise<string[]> {
    const consultaLivrosDoAluguel = await this.findOne({
      where: { aluguel_id },
      relations: ['livros'],
      select: ['livros'],
    });

    if (consultaLivrosDoAluguel) {
      return consultaLivrosDoAluguel.livros.map((livro) => {
        return livro.livro_id !== undefined ? livro.livro_id : undefined;
      });
    }

    return;
  }

  async verificaAluguelEDeletaAluguelSeNaoFoiValidado(
    aluguel_id: string,
  ): Promise<void> {
    if (aluguel_id) {
      //Se tiver...Irá deletar
      await this.createQueryBuilder()
        .delete()
        .from(Aluguel)
        .where('aluguel_id = :aluguel_id', {
          aluguel_id,
        })
        .andWhere('status_aluguel = "NAO_VALIDADO"')
        .execute();

      aluguel_id = null;
    }
  }

  async inserirLivrosNaTabelaLivrosAlugadosFinalizados(
    aluguel_id: string,
    livro_id: string,
  ): Promise<void> {
    await this.query(`
      INSERT INTO livros_alugados_finalizados(aluguel_id, livro_id) VALUES (
        "${aluguel_id}",
        "${livro_id}"
      );
    `);
  }

  async inserirAluguelFinalizadoNaTabelaAlugueisFinalizados(
    aluguel_id: string,
    dia_finalizado: string,
  ): Promise<void> {
    const aluguel = await this.consultarAluguel(aluguel_id);

    await this.query(`
      INSERT INTO alugueis_finalizados(aluguel_id, usuario_id, dia_finalizado) VALUES (
        "${aluguel.aluguel_id}",
        "${aluguel.usuario_id}",
        "${dia_finalizado}"
      );
    `);
  }

  async removerLivrosDaTabelaLivrosAlugados(
    aluguel_id: string,
    livro_id: string,
  ): Promise<void> {
    await this.query(`
      DELETE FROM livros_alugados
      WHERE livro_id="${livro_id}" AND aluguel_id="${aluguel_id}"
    `);
  }
}

@EntityRepository(Codigo)
export class CodigoRepository extends Repository<Codigo> {
  async gerarCodigoAluguel(): Promise<Codigo> {
    const configService = new ConfigService();

    authenticator.options = {
      digits: 8,
    };

    const SECRET_TOKEN = configService.get<string>('SECRET_TOKEN');
    const codigo = authenticator.generate(SECRET_TOKEN);

    const dataAtual = moment();
    const dataExpiracao = dataAtual.add(2, 'days').format('YYYY-MM-DD');

    const novoCodigoAluguel = this.create({
      codigo: parseInt(codigo),
      data_expiracao: dataExpiracao,
      validado: false,
    });

    return await this.save(novoCodigoAluguel);
  }

  async consultarCodigo(codigo: number): Promise<Codigo> {
    return await this.findOne({
      where: { codigo },
    });
  }

  async validaCodigoAluguel(codigo: Codigo): Promise<void> {
    codigo.validado = true;

    await this.save(codigo);
  }
}
