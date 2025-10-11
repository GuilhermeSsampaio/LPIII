import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import ServiçosCriador from "../serviços/serviços-criador";
import verificarErroConteúdoToken from "../middlewares/verificar-erro-conteúdo-token";

const RotasCriador = Router();
export default RotasCriador;

RotasCriador.post("/", ServiçosCriador.cadastrarCriador);
RotasCriador.get(
  "/:id",
  verificarToken,
  ServiçosCriador.buscarCriador
);

RotasCriador.patch(
  "/",
  verificarToken,
  ServiçosCriador.atualizarCriador
);

RotasCriador.post(
  "/cervejas",
  verificarToken,
  ServiçosCriador.cadastrarCerveja
);

RotasCriador.patch(
  "/cervejas",
  verificarToken,
  ServiçosCriador.alterarCerveja
);

RotasCriador.delete(
  "/cervejas/:id",
  verificarToken,
  ServiçosCriador.removerCerveja
);

RotasCriador.get(
  "/cervejas/criador/:id",
  verificarToken,
  verificarErroConteúdoToken,
  ServiçosCriador.buscarCervejasCriador
);

RotasCriador.get(
  "/cervejas/todas",
  verificarToken,
  ServiçosCriador.buscarTodasCervejas
);

RotasCriador.get(
  "/encomendas/recebidas/:id",
  verificarToken,
  ServiçosCriador.buscarEncomendasRecebidas
);
