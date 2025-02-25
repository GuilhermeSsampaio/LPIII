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
import PeçaMusical from "./peça-musical";

export enum Nacionalidade {
  MESTRADO = "mestrado",
  DOUTORADO = "doutorado",
}

export enum Estilo {
  Moderno = "moderno",
  Barroco = "barroco",
  Romântico = "romântico",
  Contemporâneo = "contemporâneo",
}

@Entity()
export default class Maestro extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: Nacionalidade })
  nacionalidade: Nacionalidade;

  @Column()
  anos_experiência: number;

  @Column({ type: "enum", enum: Estilo })
  estilo: Estilo;

  @OneToMany(() => PeçaMusical, (peça_musical) => peça_musical.maestro)
  peças_musicais: PeçaMusical[];

  @OneToOne(() => Usuário, (usuário) => usuário.maestro, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  usuário: Usuário;
}
