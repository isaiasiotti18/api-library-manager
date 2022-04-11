import { NivelAcesso } from './../enums/nivel_acesso.enum';
import { NivelLeitor } from './../enums/nivel_leitor.enum';
import { Aluguel } from 'src/modules/aluguel/model/aluguel.model';
import { Endereco } from 'src/modules/endereco/model/endereco.model';

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

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    unique: true,
  })
  cpf: string;

  @Column({
    unique: true,
  })
  telefone: string;

  @Column()
  aluguel_id: string;

  @OneToOne(() => Aluguel)
  @JoinColumn({ name: 'aluguel_id' })
  aluguel: Aluguel;

  @Column()
  endereco_id: string;

  @OneToOne(() => Endereco)
  @JoinColumn({ name: 'endereco_id' })
  endereco: Endereco;

  @Column({
    type: 'enum',
    enum: NivelLeitor,
    default: NivelLeitor.BRONZE,
  })
  nivel_leitor: NivelLeitor;

  @Column({
    type: 'enum',
    enum: NivelAcesso,
    default: NivelAcesso.USUARIO,
  })
  nivel_acesso: NivelAcesso;
}
