import { Livro } from 'src/modules/livro/model/livro.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('editoras')
export class Editora {
  @PrimaryGeneratedColumn('uuid')
  editora_id: string;

  @Column()
  editora: string;

  @OneToMany(() => Livro, (livro) => livro.editora)
  livros: Livro[];
}
