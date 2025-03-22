import servidor from "./servidor";
export function serviçoCadastrarPatrocinador(patrocinador) {
  return servidor.post("/patrocinadores", patrocinador);
}
export function serviçoAtualizarPatrocinador(patrocinador) {
  return servidor.patch("/patrocinadores", patrocinador);
}
export function serviçoBuscarPatrocinador(cpf) {
  return servidor.get(`/patrocinadores/${cpf}`);
}
