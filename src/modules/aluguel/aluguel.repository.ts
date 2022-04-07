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
  async criarAluguel(
    usuario_id: string,
    criarAluguelDTO: CriarAluguelDTO,
  ): Promise<Aluguel> {
    const { livros_alugados, codigo, data_alugacao, data_devolucao } =
      criarAluguelDTO;

    const novoAluguel = this.create({
      usuario_id,
      codigo,
      data_alugacao,
      data_devolucao,
    });

    novoAluguel.livros = livros_alugados;

    return await this.save(novoAluguel);
  }

  async consultaLivrosDoAluguel(aluguel_id: string): Promise<Aluguel | any> {
    const consultaLivrosDoAluguel = await this.findOne({
      where: { aluguel_id },
      relations: ['livros'],
      select: ['livros'],
    });

    console.log(consultaLivrosDoAluguel);

    return consultaLivrosDoAluguel.livros.map((livro) => {
      return livro.livro_id;
    });
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
