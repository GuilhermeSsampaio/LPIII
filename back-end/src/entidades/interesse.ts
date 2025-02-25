import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Proposta from "./proposta";
import Patrocinador from "./patrocinador";

//corrigir os atributos
@Entity()
export default class Interesse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  data_manifestação: Date;

  @Column()
  justificativa: string;

  @Column()
  orçamento_disponível: number;

  @ManyToOne(() => Proposta, (proposta) => proposta.interesses, {
    onDelete: "CASCADE",
  })
  proposta: Proposta;

  @ManyToOne(() => Patrocinador, (patrocinador) => patrocinador.interesses, {
    onDelete: "CASCADE",
  })
  patrocinador: Patrocinador;
}
