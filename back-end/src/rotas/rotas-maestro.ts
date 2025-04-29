import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import ServiçosMaestro from "src/serviços/serviços-maestro";
import verificarPerfilMaestro from "../middlewares/verificar-perfil-maestro";
import verificarErroConteúdoToken from "../middlewares/verificar-erro-conteúdo-token";

const RotasMaestro = Router();
export default RotasMaestro;

RotasMaestro.post("/", ServiçosMaestro.cadastrarMaestro);
RotasMaestro.get(
  "/:cpf",
  verificarToken,
  verificarPerfilMaestro,
  ServiçosMaestro.buscarMaestro
);

RotasMaestro.patch(
  "/",
  verificarToken,
  verificarPerfilMaestro,
  ServiçosMaestro.atualizarMaestro
);

RotasMaestro.post(
  "/peças-musicais",
  verificarToken,
  verificarPerfilMaestro,
  ServiçosMaestro.cadastrarPeçaMusical
);
RotasMaestro.patch(
  "/peças-musicais",
  verificarToken,
  verificarPerfilMaestro,
  ServiçosMaestro.alterarPeçaMusical
);
RotasMaestro.delete(
  "/peças-musicais/:id",
  verificarToken,
  verificarPerfilMaestro,
  ServiçosMaestro.removerPeçaMusical
);
RotasMaestro.get(
  "/peças-musicais/maestro/:cpf",
  verificarToken,
  verificarPerfilMaestro,
  verificarErroConteúdoToken,
  ServiçosMaestro.buscarPeçasMusicaisMaestro
);
RotasMaestro.get(
  "/peças-musicais/patrocínios",
  verificarToken,
  verificarPerfilMaestro,
  ServiçosMaestro.buscarPatrocíniosPeçasMusicais
);
