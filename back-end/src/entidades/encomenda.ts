import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import CervejaArtesanal from "./cerveja-artesanal";
import GerenteEmporio from "./gerente-emporio";

@Entity()
export default class Encomenda extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  data: Date;

  @Column()
  quantidade: number;

  @Column("decimal", { precision: 10, scale: 2 })
  valor_total: number;

  @Column({ default: false })
  nota_fiscal_emitida: boolean;

  @ManyToOne(() => CervejaArtesanal, (cerveja) => cerveja.encomendas, {
    onDelete: "CASCADE",
  })
  cerveja_artesanal: CervejaArtesanal;

  @ManyToOne(() => GerenteEmporio, (gerente) => gerente.encomendas, {
    onDelete: "CASCADE",
  })
  gerente_emporio: GerenteEmporio;
}
