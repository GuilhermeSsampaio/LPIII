import { createContext, useState } from "react";
const ContextoCriador = createContext();
export default ContextoCriador;
export function ProvedorCriador({ children }) {
  const [cervejaConsultada, setCervejaConsultada] = useState({});
  const [encomendaConsultada, setEncomendaConsultada] = useState(null);
  return (
    <ContextoCriador.Provider
      value={{
        cervejaConsultada,
        setCervejaConsultada,
        encomendaConsultada,
        setEncomendaConsultada,
      }}
    >
      {children}
    </ContextoCriador.Provider>
  );
}
