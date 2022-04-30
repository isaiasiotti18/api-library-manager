import { AuthRequest } from './../../../../dist/modules/auth/models/AuthRequest.d';
import { NivelAcesso } from '../../../modules/usuario/enums/nivel_acesso.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';

export const RoleGuard = (role: NivelAcesso): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<AuthRequest>();
      const user = request.user;

      return user?.nivel_acesso.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};
