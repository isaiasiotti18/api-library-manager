import { EntityRepository, Repository } from 'typeorm';
import { NivelLeitor } from './model/nivel_leitor.model';

@EntityRepository(NivelLeitor)
export class NivelLeitorRepository extends Repository<NivelLeitor> {}
