import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilPatrocinador from "../middlewares/verificar-perfil-patrocinador";
import ServiçosPatrocinador from "../serviços/serviços-patrocinador";
import verificarErroConteúdoToken from "../middlewares/verificar-erro-conteúdo-token";

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
RotasPatrocinador.post(
  "/patrocínios/",
  verificarToken,
  verificarPerfilPatrocinador,
  ServiçosPatrocinador.cadastrarPatrocínio
);
RotasPatrocinador.delete(
  "/patrocínios/:id",
  verificarToken,
  verificarPerfilPatrocinador,
  ServiçosPatrocinador.removerPatrocínio
);
RotasPatrocinador.get(
  "/patrocínios/patrocinador/:cpf",
  verificarToken,
  verificarPerfilPatrocinador,
  verificarErroConteúdoToken,
  ServiçosPatrocinador.buscarPatrocíniosPatrocinador
);
RotasPatrocinador.get(
  "/patrocínios/peças-musicais/",
  verificarToken,
  verificarPerfilPatrocinador,
  ServiçosPatrocinador.buscarPeçasMusicais
);
