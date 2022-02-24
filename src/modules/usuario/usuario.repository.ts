import { EntityRepository, Repository } from 'typeorm';
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
}
