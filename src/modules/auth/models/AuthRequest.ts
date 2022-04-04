import { Request } from 'express';
import { Usuario } from 'src/modules/usuario/model/usuario.model';

export interface AuthRequest extends Request {
  user: Usuario;
}
