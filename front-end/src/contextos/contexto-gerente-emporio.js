import { createContext, useState } from "react";
const ContextoGerenteEmporio = createContext();
export default ContextoGerenteEmporio;
export function ProvedorGerenteEmporio({ children }) {
  const [encomendaConsultada, setEncomendaConsultada] = useState({});
  const [cervejaSelecionada, setCervejaSelecionada] = useState(null);
  return (
    <ContextoGerenteEmporio.Provider
      value={{
        encomendaConsultada,
        setEncomendaConsultada,
        cervejaSelecionada,
        setCervejaSelecionada,
      }}
    >
      {children}
    </ContextoGerenteEmporio.Provider>
  );
}
