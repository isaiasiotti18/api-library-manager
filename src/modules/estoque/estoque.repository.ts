import { EntityRepository, Repository } from 'typeorm';
import { Estoque } from './model/estoque.model';
import { EstoqueRepositoryInterface } from './interfaces/estoque-repository.interface';
import { EntradaEstoqueDTO } from './dto/entrada-estoque.dto';

@EntityRepository(Estoque)
export class EstoqueRepository
  extends Repository<Estoque>
  implements EstoqueRepositoryInterface
{
  async consultaEstoque(livro_id: string): Promise<Estoque> {
    const consultaEstoque = await this.findOne({
      where: { livro_id },
      relations: ['livro'],
    });

    return consultaEstoque;
  }

  async entradaEstoqueLivro(
    entradaEstoqueDTO: EntradaEstoqueDTO,
  ): Promise<void> {
    const { livro_id, quantidade_livro } = entradaEstoqueDTO;

    const verificaEstoqueLivro = await this.findOne({
      where: { livro_id },
    });

    if (!verificaEstoqueLivro) {
      const novoEstoque = this.create({
        livro_id,
        quantidade_livro,
      });

      await this.save(novoEstoque);
    }

    const addEstoqueLivro =
      verificaEstoqueLivro.quantidade_livro + quantidade_livro;

    await this.createQueryBuilder()
      .update()
      .set({
        quantidade_livro: addEstoqueLivro,
      })
      .where('livro_id = :livro_id', { livro_id })
      .execute();
  }

  async creditaEstoqueLivro(livro_id: string): Promise<void> {
    await this.createQueryBuilder()
      .update()
      .set({
        quantidade_livro: () => 'quantidade_livro + 1',
      })
      .where('livro_id = :livro_id', { livro_id })
      .execute();
  }

  async debitaEstoqueLivro(livro_id: string): Promise<void> {
    await this.createQueryBuilder()
      .update()
      .set({
        quantidade_livro: () => 'quantidade_livro - 1',
      })
      .where('livro_id = :livro_id', { livro_id })
      .execute();
  }
}
