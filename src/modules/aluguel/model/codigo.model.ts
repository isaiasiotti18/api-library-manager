import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('codigo')
export class Codigo {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column('date')
  data_expiracao: Date;

  @Column('boolean')
  validado: boolean;
}
