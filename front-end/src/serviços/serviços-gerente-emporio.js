import servidor from "./servidor";

export function serviçoCadastrarGerenteEmporio(gerenteEmporio) {
  return servidor.post("/gerentes-emporio", gerenteEmporio);
}

export function serviçoBuscarGerenteEmporio(cpf) {
  return servidor.get(`/gerentes-emporio/${cpf}`);
}

export function serviçoAtualizarGerenteEmporio(gerenteEmporio) {
  return servidor.patch("/gerentes-emporio", gerenteEmporio);
}

export function serviçoCadastrarEncomenda(encomenda) {
  return servidor.post("/gerentes-emporio/encomendas", encomenda);
}

export function serviçoAlterarEncomenda(encomenda) {
  return servidor.patch("/gerentes-emporio/encomendas", encomenda);
}

export function serviçoRemoverEncomenda(id) {
  return servidor.delete(`/gerentes-emporio/encomendas/${id}`);
}

export function serviçoBuscarEncomendasGerenteEmporio(cpf) {
  return servidor.get(`/gerentes-emporio/encomendas/gerente/${cpf}`);
}

export function serviçoBuscarEncomendasRecebidasCriador(cpf) {
  return servidor.get(`/gerentes-emporio/encomendas/criador/${cpf}`);
}
