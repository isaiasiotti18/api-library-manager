import { Role } from 'src/modules/usuario/enums/role.enum';

export interface UserFromJwt {
  id: string;
  email: string;
  name: string;
  role: Role;
}
