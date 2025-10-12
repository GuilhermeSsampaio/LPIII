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

  @Column({ type: "decimal", precision: 10, scale: 2 })
  valor_total: number;

  @Column({ default: false })
  nota_fiscal_emitida: boolean;

  @ManyToOne(() => CervejaArtesanal, (cerveja_artesanal) => cerveja_artesanal.encomendas, {
    onDelete: "CASCADE",
  })
  cerveja_artesanal: CervejaArtesanal;

  @ManyToOne(() => GerenteEmporio, (gerente_emporio) => gerente_emporio.encomendas, {
    onDelete: "CASCADE",
  })
  gerente_emporio: GerenteEmporio;
}
