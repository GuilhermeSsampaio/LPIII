import servidor from "./servidor";

export function servicoCadastrarCriador(criador) {
  return servidor.post("/criadores", criador);
}

export function servicoBuscarCriador(id) {
  return servidor.get(`/criadores/${id}`);
}

export function servicoAtualizarCriador(criador) {
  return servidor.patch("/criadores", criador);
}

export function servicoCadastrarCerveja(cerveja) {
  return servidor.post("/criadores/cervejas", cerveja);
}

export function servicoAlterarCerveja(cerveja) {
  return servidor.patch("/criadores/cervejas", cerveja);
}

export function servicoRemoverCerveja(id) {
  return servidor.delete(`/criadores/cervejas/${id}`);
}

export function servicoBuscarCervejasCriador(id) {
  return servidor.get(`/criadores/cervejas/criador/${id}`);
}

export function servicoBuscarTodasCervejas() {
  return servidor.get("/criadores/cervejas/todas");
}

export function servicoBuscarEncomendasRecebidas(id) {
  return servidor.get(`/criadores/encomendas/recebidas/${id}`);
}
