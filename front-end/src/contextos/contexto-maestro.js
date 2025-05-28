import { createContext, useState } from "react";
const ContextoMaestro = createContext();
export default ContextoMaestro;
export function ProvedorMaestro({ children }) {
  const [peçaMusicalConsultada, setPeçaMusicalConsultada] = useState({});
  const [patrocínioConsultado, setPatrocínioConsultado] = useState(null);
  const [patrocinadorInteressado, setPatrocinadorInteressado] = useState(null);
  return (
    <ContextoMaestro.Provider
      value={{
        peçaMusicalConsultada,
        setPeçaMusicalConsultada,
        patrocínioConsultado,
        setPatrocínioConsultado,
        patrocinadorInteressado,
        setPatrocinadorInteressado,
      }}
    >
      {children}
    </ContextoMaestro.Provider>
  );
}
