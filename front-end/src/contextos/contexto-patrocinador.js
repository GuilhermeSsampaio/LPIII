import { createContext, useState } from "react";
const ContextoPatrocinador = createContext();
export default ContextoPatrocinador;
export function ProvedorPatrocinador({ children }) {
  const [patrocínioConsultado, setpatrocínioConsultado] = useState({});
  const [peçaMusicalConsultada, setpeçaMusicalConsultada] = useState({});
  const [peçaMusicalSelecionada, setpeçaMusicalSelecionada] = useState({});
  const [peçaMusicalpatrocínio, setpeçaMusicalpatrocínio] = useState({});
  return (
    <ContextoPatrocinador.Provider
      value={{
        patrocínioConsultado,
        setpatrocínioConsultado,
        peçaMusicalConsultada,
        setpeçaMusicalConsultada,
        peçaMusicalSelecionada,
        setpeçaMusicalSelecionada,
        peçaMusicalpatrocínio,
        setpeçaMusicalpatrocínio,
      }}
    >
      {children}
    </ContextoPatrocinador.Provider>
  );
}
