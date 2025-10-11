export default function formatarPerfil(perfil) {
  switch (perfil) {
    case "criador":
      return "Criador";
    case "gerente_emporio":
      return "Gerente de Empório";
    case "maestro":
      return "Maestro";
    case "patrocinador":
      return "Patrocinador";
    default:
      return;
  }
}
