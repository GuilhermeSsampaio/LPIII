import servidor from "./servidor";

export function servicoCadastrarGerenteEmporio(gerente) {
  return servidor.post("/gerentes-emporio", gerente);
}

export function servicoBuscarGerenteEmporio(id) {
  return servidor.get(`/gerentes-emporio/${id}`);
}

export function servicoAtualizarGerenteEmporio(gerente) {
  return servidor.patch("/gerentes-emporio", gerente);
}

export function servicoCadastrarEncomenda(encomenda) {
  return servidor.post("/gerentes-emporio/encomendas", encomenda);
}

export function servicoAlterarEncomenda(encomenda) {
  return servidor.patch("/gerentes-emporio/encomendas", encomenda);
}

export function servicoRemoverEncomenda(id) {
  return servidor.delete(`/gerentes-emporio/encomendas/${id}`);
}

export function servicoBuscarEncomendasGerente(id) {
  return servidor.get(`/gerentes-emporio/encomendas/gerente/${id}`);
}

export function servicoBuscarCervejas() {
  return servidor.get("/gerentes-emporio/cervejas");
}
