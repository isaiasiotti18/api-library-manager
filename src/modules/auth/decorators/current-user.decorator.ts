import { Usuario } from './../../usuario/model/usuario.model';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../interfaces/AuthRequest';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Usuario => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.usuario;
  },
);
