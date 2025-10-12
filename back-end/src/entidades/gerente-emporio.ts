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

  @Column()
  telefone: string;

  @Column()
  localizacao_pais: string;

  @Column()
  nivel_experiencia: string;

  @OneToMany(() => Encomenda, (encomenda) => encomenda.gerente_emporio)
  encomendas: Encomenda[];

  @OneToOne(() => Usuário, (usuário) => usuário.gerente_emporio, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  usuário: Usuário;
}
