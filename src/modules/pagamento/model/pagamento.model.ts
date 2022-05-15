import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pagamento')
export class Pagamento {
  @PrimaryColumn()
  id: string;

  @Column()
  usuario_id: string;

  @Column()
  aluguel_id: string;

  @Column({
    type: 'decimal',
  })
  valor: number;

  @Column({
    default: 'NÃO POSSUI LINK DE PAGAMENTO.',
  })
  url_pagamento: string;

  @Column({
    type: 'bool',
    default: false,
  })
  pagamento_realizado: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Exclude()
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Exclude()
  updated_at: Date;
}
