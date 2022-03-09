import { Livro } from 'src/modules/livro/model/livro.model';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Genero {
  @PrimaryGeneratedColumn('uuid')
  genero_id: string;

  @Column()
  genero: string;

  @ManyToMany(() => Livro, (livro) => livro.generos)
  livros: Livro[];
}
