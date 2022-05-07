import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('codigo_recuperar_senha')
export class CodigoRecuperarSenha {
  @PrimaryColumn()
  codigo: string;

  @Column()
  email_usuario: string;

  @Column({ type: 'bool', default: true })
  valido: boolean;
}
