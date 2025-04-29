import { createContext, useState } from "react";
const ContextoMaestro = createContext();
export default ContextoMaestro;
export function ProvedorMaestro({ children }) {
  const [pecaMusicalConsultada, setPecaMusicalConsultada] = useState({});
  return (
    <ContextoMaestro.Provider
      value={{ pecaMusicalConsultada, setPecaMusicalConsultada }}
    >
      {children}
    </ContextoMaestro.Provider>
  );
}
