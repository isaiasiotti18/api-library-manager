import { Livro } from 'src/modules/livro/model/livro.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'autor' })
export class Autor {
  @PrimaryGeneratedColumn('uuid')
  autor_id: string;

  @Column()
  nome: string;

  @OneToMany(() => Livro, (livro) => livro.autor)
  livros: Livro[];
}
