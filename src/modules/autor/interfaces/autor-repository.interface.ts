import { CriarAutorDTO } from '../dtos/criar-autor.dto';
import { Autor } from '../model/autor.model';

export interface AutorRepositoryInterface {
  criarAutor(autor: CriarAutorDTO): Promise<Autor>;
  procurarAutor(nome_autor: string): Promise<Autor>;
}
