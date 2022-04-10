import { ConsultarUsuarioPorIdService } from './../../usuario/services/consultar-usuario-porId.service';
import { AluguelRepository, CodigoRepository } from './../aluguel.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidarCodigoAluguelService } from './validar-codigo-aluguel.service';
import { DebitaEstoqueLivroService } from 'src/modules/estoque/services/debita-estoque-livro.service';

@Injectable()
export class ValidarAluguelService {
  constructor(
    private readonly aluguelRepository: AluguelRepository,
    private readonly validarCodigoAluguelService: ValidarCodigoAluguelService,
    private readonly consultarUsuarioPorIdService: ConsultarUsuarioPorIdService,
    private readonly debitaEstoqueLivroService: DebitaEstoqueLivroService,
  ) {}

  async validarAluguel(usuario_id: string, codigo: number): Promise<any> {
    try {
      const consultarUsuarioComAluguel =
        await this.consultarUsuarioPorIdService.execute(usuario_id);

      const consultaLivrosAluguel =
        await this.aluguelRepository.consultaLivrosDoAluguel(
          consultarUsuarioComAluguel.aluguel_id,
        );

      consultaLivrosAluguel.map(async (livro_id: string) => {
        await this.debitaEstoqueLivroService.execute(livro_id);
      });

      await this.validarCodigoAluguelService.validarCodigoAluguel(codigo);

      return {
        message: `Código validado com sucesso! O(s) livro(s) já estão liberados. Basta você apresentar esse código para o balconista que ele liberará o(s) livro(s). Boa Leitura!!!`,
      };
    } catch (error: any) {
      throw new BadRequestException(error?.message);
    }
  }
}
