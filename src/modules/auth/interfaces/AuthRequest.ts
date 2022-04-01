import { Usuario } from '../../usuario/model/usuario.model';
import { FastifyRequest } from 'fastify';

export interface AuthRequest extends FastifyRequest {
  usuario: Usuario;
}
