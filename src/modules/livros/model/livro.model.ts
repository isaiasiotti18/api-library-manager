import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Livro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  autor: string;

  @Column()
  editora: string;

  @Column()
  isbn10: string;

  @Column()
  isbn13: string;

  @Column()
  qtd_paginas: number;

  @Column()
  publicacao: Date;
}
