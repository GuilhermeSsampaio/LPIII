import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
} from "typeorm";

import Maestro from "./maestro";
import Patrocinador from "./patrocinador";
import Criador from "./criador";
import GerenteEmporio from "./gerente-emporio";

export enum Perfil {
  PATROCINADOR = "patrocinador",
  MAESTRO = "maestro",
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
  @PrimaryColumn()
  cpf: string;

  @Column({ type: "enum", enum: Perfil })
  perfil: Perfil;

  @Column({ type: "enum", enum: Status, default: Status.PENDENTE })
  status: Status;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  questão: string;

  @Column()
  resposta: string;

  @Column({ type: "enum", enum: Cores })
  cor_tema: string;

  @OneToOne(() => Maestro, (maestro) => maestro.usuário, {
    onDelete: "CASCADE",
  })
  maestro: Maestro;

  @OneToOne(() => Patrocinador, (patrocinador) => patrocinador.usuário, {
    onDelete: "CASCADE",
  })
  patrocinador: Patrocinador;

  @OneToOne(() => Criador, (criador) => criador.usuário, {
    onDelete: "CASCADE",
  })
  criador: Criador;

  @OneToOne(() => GerenteEmporio, (gerente) => gerente.usuário, {
    onDelete: "CASCADE",
  })
  gerente_emporio: GerenteEmporio;

  @CreateDateColumn()
  data_criação: Date;
}
