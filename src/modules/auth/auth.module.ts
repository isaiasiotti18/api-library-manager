import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';
import { ConfigService } from '@nestjs/config';
import { UsuarioModule } from './../usuario/usuario.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

const configModule = new ConfigService();
const JWT_SECRET = configModule.get<string>('JWT_SECRET');

@Module({
  imports: [
    UsuarioModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
