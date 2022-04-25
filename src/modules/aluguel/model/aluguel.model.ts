import { Livro } from 'src/modules/livro/model/livro.model';
import { Usuario } from 'src/modules/usuario/model/usuario.model';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { StatusAluguel } from '../enums/status_aluguel';

import { Codigo } from './codigo.model';

@Entity('aluguel')
export class Aluguel {
  @PrimaryGeneratedColumn('uuid')
  aluguel_id: string;

  @Column('boolean')
  aluguel_validado: boolean;

  @Column()
  codigo: number;

  @OneToOne(() => Codigo)
  @JoinColumn({ name: 'codigo' })
  codigo_numero: Codigo;

  @Column('date')
  data_alugacao: Date;

  @Column('date')
  data_devolucao: Date;

  @Column()
  usuario_id: string;

  @OneToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToMany(() => Livro)
  @JoinTable({
    name: 'livros_alugados',
    joinColumn: { name: 'aluguel_id' },
    inverseJoinColumn: { name: 'livro_id' },
  })
  livros: Livro[];

  @Column({
    type: 'enum',
    enum: StatusAluguel,
    default: StatusAluguel.NAO_VALIDADO,
  })
  status_aluguel: StatusAluguel;

  @Column()
  valor_total: number;
}
