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
      const { usuario_info, telefone, localizacao_pais, nivel_experiencia } =
        request.body;
      const { usuario, token } = await ServiçosUsuário.cadastrarUsuário(
        usuario_info
      );
      const entityManager = getManager();
      await entityManager.transaction(async (transactionManager) => {
        await transactionManager.save(usuario);
        const gerente_emporio = GerenteEmporio.create({
          usuario,
          telefone,
          localizacao_pais,
          nivel_experiencia,
        });
        await transactionManager.save(gerente_emporio);
        await transactionManager.update(Usuário, usuario.id, {
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
      const { id, telefone, localizacao_pais, nivel_experiencia } = request.body;
      await GerenteEmporio.update(
        { usuario: { id } },
        { telefone, localizacao_pais, nivel_experiencia }
      );
      return response.json();
    } catch (error) {
      return response.status(500).json({ erro: "Erro BD : atualizarGerenteEmporio" });
    }
  }

  static async buscarGerenteEmporio(request, response) {
    try {
      const id = request.params.id;
      const gerente_emporio = await GerenteEmporio.findOne({
        where: { usuario: id },
        relations: ["usuario"],
      });
      if (!gerente_emporio)
        return response.status(404).json({ erro: "Gerente de Empório não encontrado." });
      return response.json({
        nome: gerente_emporio.usuario.nome,
        email: gerente_emporio.usuario.email,
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
      const { quantidade, valor_total, nota_fiscal_emitida, cerveja_artesanal_id, usuario_id } = request.body;
      const gerente_emporio = await GerenteEmporio.findOne({
        where: { usuario: usuario_id },
        relations: ["usuario"],
      });
      const cerveja = await CervejaArtesanal.findOne(cerveja_artesanal_id);
      
      await Encomenda.create({
        quantidade,
        valor_total,
        nota_fiscal_emitida,
        cerveja_artesanal: cerveja,
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

  static async buscarEncomendasGerente(request, response) {
    try {
      const usuario_id = request.params.id;
      const encomendas = await Encomenda.find({
        where: { gerente_emporio: { usuario: usuario_id } },
        relations: ["cerveja_artesanal", "cerveja_artesanal.criador", "cerveja_artesanal.criador.usuario", "gerente_emporio", "gerente_emporio.usuario"],
      });
      return response.json(encomendas);
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : buscarEncomendasGerente" });
    }
  }

  static async buscarCervejas(request, response) {
    try {
      const cervejas = await CervejaArtesanal.find({
        relations: ["criador", "criador.usuario"],
      });
      return response.json(cervejas);
    } catch (error) {
      return response.status(500).json({ erro: "Erro BD : buscarCervejas" });
    }
  }
}
