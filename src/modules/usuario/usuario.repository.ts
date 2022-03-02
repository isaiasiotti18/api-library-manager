import { EntityRepository, Repository } from 'typeorm';
import { AlterarUsuarioDTO } from './dtos/alterar-usuario.dto';
import { CriarUsuarioDTO } from './dtos/criar-usuario.dto';
import { UsuarioRepositoryInterface } from './interfaces/usuario-repository.interface';
import { Usuario } from './model/usuario.model';

@EntityRepository(Usuario)
export class UsuarioRepository
  extends Repository<Usuario>
  implements UsuarioRepositoryInterface
{
  async criarUsuario(criarUsuarioDTO: CriarUsuarioDTO): Promise<Usuario> {
    const novoUsuario = this.create(criarUsuarioDTO);

    return await this.save(novoUsuario);
  }

  async alterarUsuario(
    id_usuario: string,
    alterarUsuarioDTO: AlterarUsuarioDTO,
  ): Promise<void> {
    const { nome, telefone } = alterarUsuarioDTO;

    await this.save({
      id: id_usuario,
      nome,
      telefone,
    });
  }

  async consultarUsuarioPorId(id_usuario: string): Promise<Usuario> {
    return await this.findOne({
      where: { id: id_usuario },
    });
  }

  async retornarUsuariocomEndereco(id_usuario: string): Promise<any> {
    const usuario = await this.findOne({
      where: { id: id_usuario },
      relations: ['endereco'],
      select: ['id', 'nome', 'email', 'telefone', 'endereco'],
    });

    const { id, nome, email, telefone, endereco } = usuario;
    const { cep, logradouro, numero, bairro, cidade, uf } = endereco;

    return {
      id,
      nome,
      email,
      telefone,
      endereco: {
        cep,
        logradouro,
        numero,
        bairro,
        cidade,
        uf,
      },
    };
  }
}
