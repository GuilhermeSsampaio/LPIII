import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UsuárioContext from "../contextos/contexto-usuário";
export default function RotasGerenteEmporio() {
  const { usuárioLogado } = useContext(UsuárioContext);
  if (usuárioLogado.perfil === "gerente_emporio") return <Outlet />;
  else return <Navigate to="/" />;
}
