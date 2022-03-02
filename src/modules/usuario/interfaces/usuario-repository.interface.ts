import { AlterarUsuarioDTO } from '../dtos/alterar-usuario.dto';
import { CriarUsuarioDTO } from '../dtos/criar-usuario.dto';
import { Usuario } from '../model/usuario.model';

export interface UsuarioRepositoryInterface {
  criarUsuario(criarUsuarioDTO: CriarUsuarioDTO): Promise<Usuario>;
  alterarUsuario(
    id_usuario: string,
    alterarUsuarioDTO: AlterarUsuarioDTO,
  ): Promise<void>;
  consultarUsuarioPorId(id_usuario: string): Promise<Usuario>;
  retornarUsuariocomEndereco(id_usuario: string): Promise<Usuario>;
}
