import { Perfil } from "../entidades/usuário";
export default function verificarPerfilPatrocinador(request, response, next) {
  if (request.perfil === Perfil.PATROCINADOR) return next();
  else return response.status(401).json({ erro: "Acesso não autorizado." });
}
