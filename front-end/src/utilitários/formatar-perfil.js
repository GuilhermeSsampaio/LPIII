export default function formatarPerfil(perfil) {
  switch (perfil) {
    case "maestro":
      return "Maestro";
    case "patrocinador":
      return "Patrocinador";
    case "criador":
      return "Criador";
    case "gerente_emporio":
      return "Gerente de Empório";
    default:
      return;
  }
}
