import { AlterarUsuarioDTO } from '../dtos/alterar-usuario.dto';
import { CriarUsuarioDTO } from '../dtos/criar-usuario.dto';
import { Usuario } from '../model/usuario.model';

export interface UsuarioRepositoryInterface {
  criarUsuario(criarUsuarioDTO: CriarUsuarioDTO): Promise<Usuario>;
  alterarUsuario(
    usuario_id: string,
    alterarUsuarioDTO: AlterarUsuarioDTO,
  ): Promise<void>;
  consultarUsuarioPorId(usuario_id: string): Promise<Usuario>;
  bloquearUsuario(usuario_id: string): Promise<void>;
  listarUsuariosBloqueados(): Promise<Usuario[]>;
}
