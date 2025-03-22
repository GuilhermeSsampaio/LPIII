import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import ServiçosUsuário from "./serviços-usuário";
import Maestro from "../entidades/maestro";
export default class ServiçosMaestro {
  constructor() {}
  static async cadastrarMaestro(request, response) {
    try {
      const { usuário_info, estilo, anos_experiência, nacionalidade } =
        request.body;
      const { usuário, token } = await ServiçosUsuário.cadastrarUsuário(
        usuário_info
      );
      const entityManager = getManager();
      await entityManager.transaction(async (transactionManager) => {
        await transactionManager.save(usuário);
        const maestro = Maestro.create({
          usuário,
          estilo,
          anos_experiência,
          nacionalidade,
        });
        await transactionManager.save(maestro);
        await transactionManager.update(Usuário, usuário.cpf, {
          status: Status.ATIVO,
        });
        return response.json({ status: Status.ATIVO, token });
      });
    } catch (error) {
      return response.status(500).json({ erro: error });
    }
  }
  static async atualizarMaestro(request, response) {
    try {
      const { cpf, estilo, anos_experiência, nacionalidade } = request.body;
      const cpf_encriptado = md5(cpf);
      await Maestro.update(
        { usuário: { cpf: cpf_encriptado } },
        { estilo, anos_experiência, nacionalidade }
      );
      return response.json();
    } catch (error) {
      return response.status(500).json({ erro: "Erro BD : atualizarMaestro" });
    }
  }

  static async buscarMaestro(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const maestro = await Maestro.findOne({
        where: { usuário: cpf_encriptado },
        relations: ["usuário"],
      });
      if (!maestro)
        return response.status(404).json({ erro: "Maestro não encontrado." });
      return response.json({
        nome: maestro.usuário.nome,
        email: maestro.usuário.email,
        estilo: maestro.estilo,
        anos_experiência: maestro.anos_experiência,
        nacionalidade: maestro.nacionalidade,
      });
    } catch (error) {
      return response.status(500).json({ erro: "Erro BD : buscarMaestro" });
    }
  }
}
