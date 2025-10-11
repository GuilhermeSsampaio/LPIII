import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import { servicoBuscarEncomendasRecebidas } from "../../serviços/servicos-criador";
import mostrarToast from "../../utilitários/mostrar-toast";
import {
  estilizarBotãoRetornar,
  estilizarCard,
  estilizarDataTable,
  estilizarDivider,
  estilizarFlex,
} from "../../utilitários/estilos";
import { TAMANHOS } from "../../utilitários/constantes";

export default function EncomendasRecebidas() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const [listaEncomendas, setListaEncomendas] = useState([]);
  const navegar = useNavigate();

  function retornarPáginaInicial() {
    navegar("/pagina-inicial");
  }

  function NomeGerenteTemplate(encomenda) {
    return encomenda.gerente_emporio?.usuario?.nome || "";
  }

  function NomeCervejaTemplate(encomenda) {
    return encomenda.cerveja_artesanal?.nome || "";
  }

  function DataTemplate(encomenda) {
    return new Date(encomenda.data).toLocaleDateString();
  }

  function NotaFiscalTemplate(encomenda) {
    return encomenda.nota_fiscal_emitida ? "Sim" : "Não";
  }

  useEffect(() => {
    let desmontado = false;
    async function buscarEncomendasRecebidas() {
      try {
        const response = await servicoBuscarEncomendasRecebidas(usuárioLogado.id);
        if (!desmontado && response.data) {
          setListaEncomendas(response.data);
        }
      } catch (error) {
        const erro = error.response?.data?.erro;
        if (erro) mostrarToast(referênciaToast, erro, "erro");
      }
    }
    buscarEncomendasRecebidas();
    return () => (desmontado = true);
  }, [usuárioLogado.id]);

  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} />
      <Card
        title="Encomendas Recebidas"
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        <DataTable
          dataKey="id"
          size="small"
          paginator
          rows={TAMANHOS.MAX_LINHAS_TABELA}
          emptyMessage="Nenhuma encomenda encontrada."
          value={listaEncomendas}
          responsiveLayout="scroll"
          breakpoint="490px"
          removableSort
          className={estilizarDataTable()}
        >
          <Column header="Cerveja" body={NomeCervejaTemplate} sortable />
          <Column header="Gerente" body={NomeGerenteTemplate} sortable />
          <Column field="quantidade" header="Quantidade" sortable />
          <Column field="valor_total" header="Valor Total" sortable />
          <Column header="Data" body={DataTemplate} sortable />
          <Column header="Nota Fiscal" body={NotaFiscalTemplate} sortable />
        </DataTable>
        <Divider className={estilizarDivider()} />
        <Button
          className={estilizarBotãoRetornar()}
          label="Retornar"
          onClick={retornarPáginaInicial}
        />
      </Card>
    </div>
  );
}
