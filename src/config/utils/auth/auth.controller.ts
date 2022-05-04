import { Role } from 'src/modules/usuario/enums/role.enum';
import { Roles } from 'src/config/utils/auth/decorators/roles.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { LoginRequestBody } from './models/LoginRequestBody';

@Controller('controle-acesso')
@ApiTags('acesso')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login/usuario')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginRequestBody })
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
