import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
} from "typeorm";

import Criador from "./criador";
import GerenteEmporio from "./gerente-emporio";

export enum Perfil {
  CRIADOR = "criador",
  GERENTE_EMPORIO = "gerente_emporio",
}

export enum Status {
  PENDENTE = "pendente",
  ATIVO = "ativo",
  INATIVO = "inativo",
}

export enum Cores {
  AMARELO = "yellow",
  ANIL = "indigo",
  AZUL = "blue",
  AZUL_PISCINA = "cyan",
  CINZA_ESCURO = "bluegray",
  LARANJA = "orange",
  ROSA = "pink",
  ROXO = "purple",
  VERDE = "green",
  VERDE_AZULADO = "teal",
}
// falta ver se os atributos estão certros

@Entity()
export default class Usuário extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  senha: string;

  @Column({ type: "enum", enum: Perfil })
  perfil: Perfil;

  @Column({ type: "enum", enum: Status, default: Status.ATIVO })
  status: Status;

  @Column({ nullable: true })
  questao_seguranca: string;

  @Column({ nullable: true })
  resposta_seguranca: string;

  @Column({ type: "enum", enum: Cores, default: Cores.AZUL })
  cor_tema: string;

  @OneToOne(() => Criador, (criador) => criador.usuario, {
    onDelete: "CASCADE",
  })
  criador: Criador;

  @OneToOne(() => GerenteEmporio, (gerente_emporio) => gerente_emporio.usuario, {
    onDelete: "CASCADE",
  })
  gerente_emporio: GerenteEmporio;

  @CreateDateColumn()
  data_criação: Date;
}
