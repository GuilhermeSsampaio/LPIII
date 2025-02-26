import { useContext } from "react";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import ContextoUsuário from "../../contextos/contexto-usuário";
// import imge from "../../imagens/image.png";
import imge from "../../imagens/img.png";
import {
  estilizarCard,
  estilizarCardHeaderCentralizado,
  estilizarPáginaÚnica,
} from "../../utilitários/estilos";
export default function PáginaInicial() {
  const { usuárioLogado } = useContext(ContextoUsuário);
  function HeaderCentralizado() {
    return (
      <div className={estilizarCardHeaderCentralizado()}>
        Propostas de Apresentações Musicais
      </div>
    );
  }
  return (
    <div className={estilizarPáginaÚnica()}>
      <Card
        header={HeaderCentralizado}
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        <Image
          src={imge}
          alt="Venha fazer a diferença!"
          width={900}
          height={500}
        />
      </Card>
    </div>
  );
}
