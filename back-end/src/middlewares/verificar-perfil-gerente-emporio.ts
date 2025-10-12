import { Perfil } from "../entidades/usuário";
export default function verificarPerfilGerenteEmporio(request, response, next) {
  if (request.perfil === Perfil.GERENTE_EMPORIO) return next();
  else return response.status(401).json({ erro: "Acesso não autorizado." });
}
