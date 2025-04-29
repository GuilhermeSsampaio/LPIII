import { createContext, useState } from "react";
const ContextoMaestro = createContext();
export default ContextoMaestro;
export function ProvedorMaestro({ children }) {
  const [peçaMusicalConsultada, setPeçaMusicalConsultada] = useState({});
  return (
    <ContextoMaestro.Provider
      value={{ peçaMusicalConsultada, setPeçaMusicalConsultada }}
    >
      {children}
    </ContextoMaestro.Provider>
  );
}
