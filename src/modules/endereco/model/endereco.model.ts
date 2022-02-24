import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('endereco')
export class Endereco {
  @PrimaryGeneratedColumn('uuid')
  endereco_id: string;

  @Column()
  cep: string;

  @Column()
  logradouro: string;

  @Column()
  numero: number;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column()
  uf: string;
}
