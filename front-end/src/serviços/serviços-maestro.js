import servidor from "./servidor";

export function serviçoCadastrarMaestro(maestro) {
  return servidor.post("/maestros", maestro);
}

export function serviçoBuscarMaestro(cpf) {
  return servidor.get(`/maestros/${cpf}`);
}
// acho que era pra ser atualizar professor
// export function serviçoAtualizarAluno(aluno) {
//   return servidor.patch("/alunos", aluno);
// }

export function serviçoAtualizarMaestro(maestro) {
  return servidor.patch("/maestros", maestro);
}
