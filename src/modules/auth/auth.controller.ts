import { ApiBody } from '@nestjs/swagger';
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

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginRequestBody })
  login(@Request() req: AuthRequest) {
    console.log(req.user);
    return this.authService.login(req.user);
  }
}
