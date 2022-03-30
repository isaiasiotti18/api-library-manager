import { Aluguel } from 'src/modules/aluguel/model/aluguel.model';
import { Endereco } from 'src/modules/endereco/model/endereco.model';
import { NivelLeitor } from 'src/modules/nivel-leitor/model/nivel_leitor.model';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha_hash: string;

  @Column()
  cpf: string;

  @Column()
  telefone: string;

  @Column()
  aluguel_id: string;

  @OneToOne(() => Aluguel)
  @JoinColumn({ name: 'aluguel_id' })
  aluguel: Aluguel;

  @Column()
  nivel_id: string;

  @OneToOne(() => NivelLeitor)
  @JoinColumn({ name: 'nivel_id' })
  nivel_leitor: NivelLeitor;

  @Column()
  endereco_id: string;

  @OneToOne(() => Endereco)
  @JoinColumn({ name: 'endereco_id' })
  endereco: Endereco;
}
