import { CodigoRecuperarSenha } from './model/codigo_recuperar_senha.model';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CodigoRecuperarSenha)
export class CodigoRecuperarSenhaRepository extends Repository<CodigoRecuperarSenha> {}
