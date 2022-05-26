import { StatusAcesso } from './enums/status_acesso.enum';
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

  async atribuirAluguel(usuario_id: string, aluguel_id: string): Promise<void> {
    await this.save({
      id: usuario_id,
      aluguel_id,
    });
  }

  async consultarUsuarioPorId(usuario_id: string): Promise<Usuario> {
    return await this.findOne({
      where: { id: usuario_id },
    });
  }

  async consultarUsuarioPorEmail(email: string): Promise<Usuario> {
    return await this.findOne({
      where: { email },
    });
  }

  async bloquearUsuario(usuario_id: string): Promise<void> {
    await this.save({
      id: usuario_id,
      status_acesso: StatusAcesso.BLOQUEADO,
    });
  }

  async desbloquearUsuario(usuario_id: string): Promise<void> {
    await this.save({
      id: usuario_id,
      status_acesso: StatusAcesso.DESBLOQUEADO,
    });
  }

  async listarUsuariosBloqueados(): Promise<Usuario[]> {
    const listaUsuariosBloqueados = await this.find({
      where: {
        status_acesso: StatusAcesso.BLOQUEADO,
      },
    });

    return listaUsuariosBloqueados;
  }
}
