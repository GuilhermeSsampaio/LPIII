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
import Encomenda from "./encomenda";

@Entity()
export default class GerenteEmporio extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  telefone: string;

  @Column({ nullable: true })
  localizacao_pais: string;

  @Column({ nullable: true })
  nivel_experiencia: string;

  @OneToMany(() => Encomenda, (encomenda) => encomenda.gerente_emporio)
  encomendas: Encomenda[];

  @OneToOne(() => Usuário, (usuario) => usuario.gerente_emporio, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  usuario: Usuário;
}
