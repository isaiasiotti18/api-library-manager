import { Autor } from 'src/modules/autor/model/autor.model';
import { Editora } from 'src/modules/editora/model/editora.model';
import { Genero } from 'src/modules/genero/model/genero.model';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('livros')
export class Livro {
  @PrimaryGeneratedColumn('uuid')
  livro_id: string;

  @Column()
  titulo: string;

  @Column()
  autor_id: string;

  @ManyToOne(() => Autor, (autor) => autor.livros)
  @JoinColumn({ name: 'autor_id' })
  autor: Autor;

  @Column()
  editora_id: string;

  @ManyToOne(() => Editora, (editora) => editora.livros)
  @JoinColumn({ name: 'editora_id' })
  editora: Editora;

  @ManyToMany(() => Genero)
  @JoinTable()
  generos: Genero[];

  @Column()
  isbn: string;

  @Column()
  qtd_paginas: number;

  @Column('datetime')
  publicacao: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
