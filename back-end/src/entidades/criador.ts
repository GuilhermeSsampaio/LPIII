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
import CervejaArtesanal from "./cerveja-artesanal";

@Entity()
export default class Criador extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  pais_origem: string;

  @Column({ nullable: true })
  ano_fundacao: number;

  @Column({ nullable: true })
  estilo_cerveja_especializado: string;

  @OneToMany(() => CervejaArtesanal, (cerveja) => cerveja.criador)
  cervejas: CervejaArtesanal[];

  @OneToOne(() => Usuário, (usuario) => usuario.criador, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  usuario: Usuário;
}
