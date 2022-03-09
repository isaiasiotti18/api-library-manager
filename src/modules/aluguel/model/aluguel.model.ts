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

@Entity('aluguel')
export class Aluguel {
  @PrimaryGeneratedColumn('uuid')
  aluguel_id: string;

  @Column('boolean')
  aluguel_validado: boolean;

  @Column()
  codigo_validacao_aluguel: string;

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

  @Column('boolean')
  foi_devolvido: boolean;
}

@Entity('codigo')
export class Codigo {
  @PrimaryGeneratedColumn()
  codigo: any;

  @Column('date')
  data_expiracao: Date;

  @Column('boolean')
  validado: boolean;
}
