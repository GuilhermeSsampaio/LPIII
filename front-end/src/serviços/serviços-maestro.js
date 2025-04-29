import servidor from "./servidor";

export function serviçoCadastrarMaestro(maestro) {
  return servidor.post("/maestros", maestro);
}

export function serviçoBuscarMaestro(cpf) {
  return servidor.get(`/maestros/${cpf}`);
}

export function serviçoAtualizarMaestro(maestro) {
  return servidor.patch("/maestros", maestro);
}

export function serviçoCadastrarPeçaMusical(peçaMusical) {
  return servidor.post("/maestros/peças-musicais", peçaMusical);
}

export function serviçoAlterarPeçaMusical(peçaMusical) {
  return servidor.patch("/maestros/peças-musicais", peçaMusical);
}

export function serviçoRemoverPeçaMusical(id) {
  return servidor.delete(`/maestros/peças-musicais/${id}`);
}

export function serviçoBuscarPeçasMusicaisMaestro(cpf) {
  return servidor.get(`/maestros/peças-musicais/maestro/${cpf}`);
}

export function serviçoBuscarPatrocíniosPeçasMusicais() {
  return servidor.get("/maestros/peças-musicais/patrocínios");
}
