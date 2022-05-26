import { AuthRequest } from 'src/utils/auth/models/AuthRequest';
import { User } from '../models/user.class';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/modules/usuario/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<AuthRequest>();

    console.log(user);
    console.log(user.role);

    return requireRoles.some((role) => user.role?.includes(role));
  }
}
