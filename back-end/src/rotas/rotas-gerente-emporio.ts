import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import ServiçosGerenteEmporio from "src/serviços/serviços-gerente-emporio";
import verificarPerfilGerenteEmporio from "../middlewares/verificar-perfil-gerente-emporio";
import verificarErroConteúdoToken from "../middlewares/verificar-erro-conteúdo-token";

const RotasGerenteEmporio = Router();
export default RotasGerenteEmporio;

RotasGerenteEmporio.post("/", ServiçosGerenteEmporio.cadastrarGerenteEmporio);
RotasGerenteEmporio.get(
  "/:cpf",
  verificarToken,
  verificarPerfilGerenteEmporio,
  ServiçosGerenteEmporio.buscarGerenteEmporio
);

RotasGerenteEmporio.patch(
  "/",
  verificarToken,
  verificarPerfilGerenteEmporio,
  ServiçosGerenteEmporio.atualizarGerenteEmporio
);

RotasGerenteEmporio.post(
  "/encomendas",
  verificarToken,
  verificarPerfilGerenteEmporio,
  ServiçosGerenteEmporio.cadastrarEncomenda
);
RotasGerenteEmporio.patch(
  "/encomendas",
  verificarToken,
  verificarPerfilGerenteEmporio,
  ServiçosGerenteEmporio.alterarEncomenda
);
RotasGerenteEmporio.delete(
  "/encomendas/:id",
  verificarToken,
  verificarPerfilGerenteEmporio,
  ServiçosGerenteEmporio.removerEncomenda
);
RotasGerenteEmporio.get(
  "/encomendas/gerente/:cpf",
  verificarToken,
  verificarPerfilGerenteEmporio,
  verificarErroConteúdoToken,
  ServiçosGerenteEmporio.buscarEncomendasGerenteEmporio
);
RotasGerenteEmporio.get(
  "/encomendas/criador/:cpf",
  verificarToken,
  ServiçosGerenteEmporio.buscarEncomendasCriador
);
