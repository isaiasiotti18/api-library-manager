import { AluguelRepository } from './../aluguel.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FinalizarAluguelEDevolverLivrosService {
  constructor(private readonly aluguelRepository: AluguelRepository) {}
}
