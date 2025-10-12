import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import ServiçosUsuário from "./serviços-usuário";
import GerenteEmporio from "../entidades/gerente-emporio";
import Encomenda from "../entidades/encomenda";
import CervejaArtesanal from "../entidades/cerveja-artesanal";

export default class ServiçosGerenteEmporio {
  constructor() {}
  
  static async cadastrarGerenteEmporio(request, response) {
    try {
      const { usuário_info, telefone, localizacao_pais, nivel_experiencia } =
        request.body;
      const { usuário, token } = await ServiçosUsuário.cadastrarUsuário(
        usuário_info
      );
      const entityManager = getManager();
      await entityManager.transaction(async (transactionManager) => {
        await transactionManager.save(usuário);
        const gerente_emporio = GerenteEmporio.create({
          usuário,
          telefone,
          localizacao_pais,
          nivel_experiencia,
        });
        await transactionManager.save(gerente_emporio);
        await transactionManager.update(Usuário, usuário.cpf, {
          status: Status.ATIVO,
        });
        return response.json({ status: Status.ATIVO, token });
      });
    } catch (error) {
      return response.status(500).json({ erro: error });
    }
  }

  static async atualizarGerenteEmporio(request, response) {
    try {
      const { cpf, telefone, localizacao_pais, nivel_experiencia } = request.body;
      const cpf_encriptado = md5(cpf);
      await GerenteEmporio.update(
        { usuário: { cpf: cpf_encriptado } },
        { telefone, localizacao_pais, nivel_experiencia }
      );
      return response.json();
    } catch (error) {
      return response.status(500).json({ erro: "Erro BD : atualizarGerenteEmporio" });
    }
  }

  static async buscarGerenteEmporio(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const gerente_emporio = await GerenteEmporio.findOne({
        where: { usuário: cpf_encriptado },
        relations: ["usuário"],
      });
      if (!gerente_emporio)
        return response.status(404).json({ erro: "Gerente de Empório não encontrado." });
      return response.json({
        nome: gerente_emporio.usuário.nome,
        email: gerente_emporio.usuário.email,
        telefone: gerente_emporio.telefone,
        localizacao_pais: gerente_emporio.localizacao_pais,
        nivel_experiencia: gerente_emporio.nivel_experiencia,
      });
    } catch (error) {
      return response.status(500).json({ erro: "Erro BD : buscarGerenteEmporio" });
    }
  }

  static async cadastrarEncomenda(request, response) {
    try {
      const { quantidade, valor_total, nota_fiscal_emitida, cerveja_artesanal_id, cpf } = request.body;
      const cpf_encriptado = md5(cpf);
      const gerente_emporio = await GerenteEmporio.findOne({
        where: { usuário: cpf_encriptado },
        relations: ["usuário"],
      });
      const cerveja_artesanal = await CervejaArtesanal.findOne(cerveja_artesanal_id);
      await Encomenda.create({
        quantidade,
        valor_total,
        nota_fiscal_emitida,
        cerveja_artesanal,
        gerente_emporio,
      }).save();
      return response.json();
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : cadastrarEncomenda" });
    }
  }

  static async alterarEncomenda(request, response) {
    try {
      const { id, quantidade, valor_total, nota_fiscal_emitida } = request.body;
      await Encomenda.update(id, {
        quantidade,
        valor_total,
        nota_fiscal_emitida,
      });
      return response.json();
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : alterarEncomenda", error });
    }
  }

  static async removerEncomenda(request, response) {
    try {
      const id_encomenda = request.params.id;
      const encomenda = await Encomenda.findOne(id_encomenda);
      await Encomenda.remove(encomenda);
      return response.json();
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : removerEncomenda" });
    }
  }

  static async buscarEncomendasGerenteEmporio(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const encomendas = await Encomenda.find({
        where: { gerente_emporio: { usuário: cpf_encriptado } },
        relations: ["gerente_emporio", "gerente_emporio.usuário", "cerveja_artesanal", "cerveja_artesanal.criador", "cerveja_artesanal.criador.usuário"],
      });
      return response.json(encomendas);
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : buscarEncomendasGerenteEmporio" });
    }
  }

  static async buscarEncomendasCriador(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const encomendas = await Encomenda.find({
        where: { cerveja_artesanal: { criador: { usuário: cpf_encriptado } } },
        relations: ["gerente_emporio", "gerente_emporio.usuário", "cerveja_artesanal", "cerveja_artesanal.criador", "cerveja_artesanal.criador.usuário"],
      });
      return response.json(encomendas);
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : buscarEncomendasCriador" });
    }
  }
}
