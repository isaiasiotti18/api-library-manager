import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AluguelRepository } from '../aluguel.repository';
import { LivroRepository } from '../../livro/livro.repository';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private readonly aluguelRepository: AluguelRepository,
    private readonly livroRepository: LivroRepository,
  ) {}
}
