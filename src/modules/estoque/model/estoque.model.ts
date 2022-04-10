import { Livro } from 'src/modules/livro/model/livro.model';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('estoque')
export class Estoque {
  @PrimaryGeneratedColumn('increment')
  estoque_id: string;

  @Column()
  livro_id: string;

  @OneToOne(() => Livro)
  @JoinColumn({ name: 'livro_id' })
  livro: Livro;

  @Column({ type: 'int' })
  quantidade_livro: number;
}
