import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilPatrocinador from "../middlewares/verificar-perfil-patrocinador";
import ServiçosPatrocinador from "../serviços/serviços-patrocinador";

const RotasPatrocinador = Router();
export default RotasPatrocinador;
RotasPatrocinador.post("/", ServiçosPatrocinador.cadastrarPatrocinador);
RotasPatrocinador.patch(
  "/",
  verificarToken,
  verificarPerfilPatrocinador,
  ServiçosPatrocinador.atualizarPatrocinador
);
RotasPatrocinador.get(
  "/:cpf",
  verificarToken,
  verificarPerfilPatrocinador,
  ServiçosPatrocinador.buscarPatrocinador
);
