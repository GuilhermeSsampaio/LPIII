import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import ServiçosCriador from "src/serviços/serviços-criador";
import verificarErroConteúdoToken from "../middlewares/verificar-erro-conteúdo-token";

const RotasCriador = Router();
export default RotasCriador;

RotasCriador.post("/", ServiçosCriador.cadastrarCriador);
RotasCriador.get(
  "/:cpf",
  verificarToken,
  ServiçosCriador.buscarCriador
);

RotasCriador.patch(
  "/",
  verificarToken,
  ServiçosCriador.atualizarCriador
);

RotasCriador.post(
  "/cervejas-artesanais",
  verificarToken,
  ServiçosCriador.cadastrarCervejaArtesanal
);

RotasCriador.patch(
  "/cervejas-artesanais",
  verificarToken,
  ServiçosCriador.alterarCervejaArtesanal
);

RotasCriador.delete(
  "/cervejas-artesanais/:id",
  verificarToken,
  ServiçosCriador.removerCervejaArtesanal
);

RotasCriador.get(
  "/cervejas-artesanais/criador/:cpf",
  verificarToken,
  verificarErroConteúdoToken,
  ServiçosCriador.buscarCervejasArtesanaisCriador
);

RotasCriador.get(
  "/cervejas-artesanais/todas",
  verificarToken,
  ServiçosCriador.buscarTodasCervejasArtesanais
);
