import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import ServiçosGerenteEmporio from "src/serviços/serviços-gerente-emporio";
import verificarErroConteúdoToken from "../middlewares/verificar-erro-conteúdo-token";

const RotasGerenteEmporio = Router();
export default RotasGerenteEmporio;

RotasGerenteEmporio.post("/", ServiçosGerenteEmporio.cadastrarGerenteEmporio);
RotasGerenteEmporio.get(
  "/:cpf",
  verificarToken,
  ServiçosGerenteEmporio.buscarGerenteEmporio
);

RotasGerenteEmporio.patch(
  "/",
  verificarToken,
  ServiçosGerenteEmporio.atualizarGerenteEmporio
);

RotasGerenteEmporio.post(
  "/encomendas",
  verificarToken,
  ServiçosGerenteEmporio.cadastrarEncomenda
);

RotasGerenteEmporio.patch(
  "/encomendas",
  verificarToken,
  ServiçosGerenteEmporio.alterarEncomenda
);

RotasGerenteEmporio.delete(
  "/encomendas/:id",
  verificarToken,
  ServiçosGerenteEmporio.removerEncomenda
);

RotasGerenteEmporio.get(
  "/encomendas/gerente/:cpf",
  verificarToken,
  verificarErroConteúdoToken,
  ServiçosGerenteEmporio.buscarEncomendasGerenteEmporio
);

RotasGerenteEmporio.get(
  "/encomendas/criador/:cpf",
  verificarToken,
  ServiçosGerenteEmporio.buscarEncomendasRecebidasCriador
);
