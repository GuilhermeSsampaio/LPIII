import { createContext, useState } from "react";
const ContextoGerenteEmporio = createContext();
export default ContextoGerenteEmporio;
export function ProvedorGerenteEmporio({ children }) {
  const [cervejaArtesanalSelecionada, setCervejaArtesanalSelecionada] = useState(null);
  const [encomendaConsultada, setEncomendaConsultada] = useState(null);

  return (
    <ContextoGerenteEmporio.Provider
      value={{
        cervejaArtesanalSelecionada,
        setCervejaArtesanalSelecionada,
        encomendaConsultada,
        setEncomendaConsultada,
      }}
    >
      {children}
    </ContextoGerenteEmporio.Provider>
  );
}
