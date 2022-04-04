import { UsuarioModule } from './../usuario/usuario.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginValidationMiddleware } from './middleware/login-validation.middleware';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local-strategy';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
const JWT_KEY = configService.get<string>('JWT_KEY');

@Module({
  imports: [
    UsuarioModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
