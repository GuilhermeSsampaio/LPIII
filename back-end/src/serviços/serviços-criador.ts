import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import ServiçosUsuário from "./serviços-usuário";
import Criador from "../entidades/criador";
import CervejaArtesanal from "../entidades/cerveja-artesanal";
import Encomenda from "../entidades/encomenda";

export default class ServiçosCriador {
  constructor() {}
  
  static async cadastrarCriador(request, response) {
    try {
      const { usuario_info, pais_origem, ano_fundacao, estilo_cerveja_especializado } =
        request.body;
      const { usuario, token } = await ServiçosUsuário.cadastrarUsuário(
        usuario_info
      );
      const entityManager = getManager();
      await entityManager.transaction(async (transactionManager) => {
        await transactionManager.save(usuario);
        const criador = Criador.create({
          usuario,
          pais_origem,
          ano_fundacao,
          estilo_cerveja_especializado,
        });
        await transactionManager.save(criador);
        await transactionManager.update(Usuário, usuario.id, {
          status: Status.ATIVO,
        });
        return response.json({ status: Status.ATIVO, token });
      });
    } catch (error) {
      return response.status(500).json({ erro: error });
    }
  }

  static async atualizarCriador(request, response) {
    try {
      const { id, pais_origem, ano_fundacao, estilo_cerveja_especializado } = request.body;
      await Criador.update(
        { usuario: { id } },
        { pais_origem, ano_fundacao, estilo_cerveja_especializado }
      );
      return response.json();
    } catch (error) {
      return response.status(500).json({ erro: "Erro BD : atualizarCriador" });
    }
  }

  static async buscarCriador(request, response) {
    try {
      const id = request.params.id;
      const criador = await Criador.findOne({
        where: { usuario: id },
        relations: ["usuario"],
      });
      if (!criador)
        return response.status(404).json({ erro: "Criador não encontrado." });
      return response.json({
        nome: criador.usuario.nome,
        email: criador.usuario.email,
        pais_origem: criador.pais_origem,
        ano_fundacao: criador.ano_fundacao,
        estilo_cerveja_especializado: criador.estilo_cerveja_especializado,
      });
    } catch (error) {
      return response.status(500).json({ erro: "Erro BD : buscarCriador" });
    }
  }

  static async cadastrarCerveja(request, response) {
    try {
      const { nome, teor_alcoolico, categoria, disponibilidade, contem_gluten, usuario_id } = request.body;
      const criador = await Criador.findOne({
        where: { usuario: usuario_id },
        relations: ["usuario"],
      });
      await CervejaArtesanal.create({
        nome,
        teor_alcoolico,
        categoria,
        disponibilidade,
        contem_gluten,
        criador,
      }).save();
      return response.json();
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : cadastrarCerveja" });
    }
  }

  static async alterarCerveja(request, response) {
    try {
      const { id, nome, teor_alcoolico, categoria, disponibilidade, contem_gluten } = request.body;
      await CervejaArtesanal.update(id, {
        nome,
        teor_alcoolico,
        categoria,
        disponibilidade,
        contem_gluten,
      });
      return response.json();
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : alterarCerveja", error });
    }
  }

  static async removerCerveja(request, response) {
    try {
      const id_cerveja = request.params.id;
      const cerveja = await CervejaArtesanal.findOne(id_cerveja);
      await CervejaArtesanal.remove(cerveja);
      return response.json();
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : removerCerveja" });
    }
  }

  static async buscarCervejasCriador(request, response) {
    try {
      const usuario_id = request.params.id;
      const cervejas = await CervejaArtesanal.find({
        where: { criador: { usuario: usuario_id } },
        relations: ["criador", "criador.usuario"],
      });
      return response.json(cervejas);
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : buscarCervejasCriador" });
    }
  }

  static async buscarTodasCervejas(request, response) {
    try {
      const cervejas = await CervejaArtesanal.find({
        relations: ["criador", "criador.usuario"],
      });
      return response.json(cervejas);
    } catch (error) {
      return response.status(500).json({ erro: "Erro BD : buscarTodasCervejas" });
    }
  }

  static async buscarEncomendasRecebidas(request, response) {
    try {
      const usuario_id = request.params.id;
      const encomendas = await Encomenda.find({
        where: { cerveja_artesanal: { criador: { usuario: usuario_id } } },
        relations: ["cerveja_artesanal", "cerveja_artesanal.criador", "gerente_emporio", "gerente_emporio.usuario"],
      });
      return response.json(encomendas);
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : buscarEncomendasRecebidas" });
    }
  }
}
