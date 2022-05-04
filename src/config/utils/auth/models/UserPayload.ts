import { Role } from 'src/modules/usuario/enums/role.enum';

export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  role: Role;
  iat?: number;
  exp?: number;
}
