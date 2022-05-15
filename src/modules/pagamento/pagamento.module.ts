import { PagamentoRepository } from './pagamento.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './../usuario/model/usuario.model';
import { ConfigService } from '@nestjs/config';
import { forwardRef, Module } from '@nestjs/common';
import { PagamentoController } from './pagamento.controller';
import { PagamentoService } from './pagamento.service';
import { StripeModule } from 'nestjs-stripe';
import { AluguelModule } from '../aluguel/aluguel.module';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PagamentoRepository]),
    StripeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('STRIPE_SECRET_KEY'),
        apiVersion: configService.get('STRIPE_API_VERSION'),
      }),
    }),
    AluguelModule,
    forwardRef(() => UsuarioModule),
  ],
  controllers: [PagamentoController],
  providers: [PagamentoService],
  exports: [PagamentoService],
})
export class PagamentoModule {}
