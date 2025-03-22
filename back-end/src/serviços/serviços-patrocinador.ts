import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import Patrocinador from "../entidades/patrocinador";
import ServiçosUsuário from "./serviços-usuário";
export default class ServiçosPatrocinador {
  constructor() {}
  static async cadastrarPatrocinador(request, response) {
    try {
      const { usuário_info, email, telefone } = request.body;
      const { usuário, token } = await ServiçosUsuário.cadastrarUsuário(
        usuário_info
      );
      const entityManager = getManager();
      await entityManager.transaction(async (transactionManager) => {
        await transactionManager.save(usuário);
        const patrocinador = Patrocinador.create({ usuário, email, telefone });
        await transactionManager.save(patrocinador);
        await transactionManager.update(Usuário, usuário.cpf, {
          status: Status.ATIVO,
        });
        return response.json({ status: Status.ATIVO, token });
      });
    } catch (error) {
      return response.status(500).json({ erro: error });
    }
  }
  static async atualizarPatrocinador(request, response) {
    try {
      const { cpf, email, telefone } = request.body;
      const cpf_encriptado = md5(cpf);
      await Patrocinador.update(
        { usuário: { cpf: cpf_encriptado } },
        { email, telefone }
      );
      return response.json();
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : atualizarPatrocinador" });
    }
  }
  static async buscarPatrocinador(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const patrocinador = await Patrocinador.findOne({
        where: { usuário: cpf_encriptado },
        relations: ["usuário"],
      });
      if (!patrocinador)
        return response
          .status(404)
          .json({ erro: "Patrocinador não encontrado." });
      return response.json({
        nome: patrocinador.usuário.nome,
        email: patrocinador.usuário.email,

        telefone: patrocinador.telefone,
      });
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : buscarPatrocinador" });
    }
  }
}
