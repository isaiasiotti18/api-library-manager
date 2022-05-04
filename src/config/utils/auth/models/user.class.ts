import { StatusAcesso } from 'src/modules/usuario/enums/status_acesso.enum';
import { Role } from 'src/modules/usuario/enums/role.enum';
import { NivelLeitor } from 'src/modules/usuario/enums/nivel_leitor.enum';

export class User {
  id: string;
  nome: string;
  email: string;
  password: string;
  cpf: string;
  telefone: string;
  aluguel_id: string;
  endereco_id: string;
  nivel_leitor: NivelLeitor;
  role?: Role;
  status_acesso: StatusAcesso;
}
