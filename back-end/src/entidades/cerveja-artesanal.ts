import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Criador from "./criador";
import Encomenda from "./encomenda";

@Entity()
export default class CervejaArtesanal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  teor_alcoolico: number;

  @Column()
  categoria: string;

  @Column({ default: "ano_todo" })
  disponibilidade: string;

  @Column({ default: true })
  contem_gluten: boolean;

  @ManyToOne(() => Criador, (criador) => criador.cervejas_artesanais, {
    onDelete: "CASCADE",
  })
  criador: Criador;

  @OneToMany(() => Encomenda, (encomenda) => encomenda.cerveja_artesanal)
  encomendas: Encomenda[];
}
