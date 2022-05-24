import { UsuarioModule } from 'src/modules/usuario/usuario.module';
import { MailModule } from 'src/config/utils/mail/mail.module';
import { AluguelModule } from './../../../modules/aluguel/aluguel.module';
import { Module, forwardRef } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { PagamentoModule } from 'src/modules/pagamento/pagamento.module';

@Module({
  imports: [
    forwardRef(() => AluguelModule),
    MailModule,
    UsuarioModule,
    PagamentoModule,
  ],
  providers: [TasksService],
})
export class TasksModule {}
