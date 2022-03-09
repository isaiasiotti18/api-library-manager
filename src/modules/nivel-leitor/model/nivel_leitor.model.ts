import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('nivel_leitor')
export class NivelLeitor {
  @PrimaryColumn()
  nivel_id: number;

  @Column()
  nivel: string;
}
