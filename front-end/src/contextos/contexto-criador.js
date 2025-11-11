import { createContext, useState } from "react";
const ContextoCriador = createContext();
export default ContextoCriador;
export function ProvedorCriador({ children }) {
  const [cervejaArtesanalConsultada, setCervejaArtesanalConsultada] = useState({});
  const [encomendaConsultada, setEncomendaConsultada] = useState(null);

  return (
    <ContextoCriador.Provider
      value={{
        cervejaArtesanalConsultada,
        setCervejaArtesanalConsultada,
        encomendaConsultada,
        setEncomendaConsultada,
      }}
    >
      {children}
    </ContextoCriador.Provider>
  );
}
