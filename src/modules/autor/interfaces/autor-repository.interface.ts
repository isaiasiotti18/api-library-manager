import { CriarAutorDTO } from '../dtos/criar-autor.dto';
import { Autor } from '../model/autor.model';

export interface AutorRepositoryInterface {
  cadastrarAutor(autor: CriarAutorDTO): Promise<Autor>;
  consultarAutor(nome_autor: string): Promise<Autor>;
}
