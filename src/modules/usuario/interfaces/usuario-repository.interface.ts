import { CriarUsuarioDTO } from '../dtos/criar-usuario.dto';
import { Usuario } from '../model/usuario.model';

export interface UsuarioRepositoryInterface {
  criarUsuario(criarUsuarioDTO: CriarUsuarioDTO): Promise<Usuario>;
}
