import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Usuário from "./usuário";
import Patrocínio from "./patrocínio";
// corrigir os atributos
export enum Tipo {
  PF = "PESSOA_FÍSICA",
  EP = "EMPRESA",
}

@Entity()
export default class Patrocinador extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ type: "enum", enum: Tipo })
  tipo: Tipo;

  @Column()
  telefone: number;

  @OneToMany(() => Patrocínio, (patrocínio) => patrocínio.patrocinador)
  patrocínios: Patrocínio[];

  @OneToOne(() => Usuário, (usuário) => usuário.patrocinador, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  usuário: Usuário;
}
