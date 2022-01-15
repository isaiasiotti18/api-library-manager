import { Genero } from '../model/genero.model';
import { CriarGeneroDTO } from '../dtos/criar-genero.dto';

export interface GeneroRepositoryInterface {
  criarGenero(genero: CriarGeneroDTO): Promise<Genero>;
  procurarGenero(genero: string): Promise<Genero>;
}
