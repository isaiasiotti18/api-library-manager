import { Module } from '@nestjs/common';
import { LivroModule } from 'src/modules/livro/livro.module';
import { LivroRepository } from 'src/modules/livro/livro.repository';
import { AluguelModule } from '../aluguel.module';
import { AluguelRepository } from '../aluguel.repository';
import { TaskService } from './task.service';

@Module({
  imports: [AluguelModule, LivroModule],
  providers: [TaskService],
})
export class TaskModule {}
