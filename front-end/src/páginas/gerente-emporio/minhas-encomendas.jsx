import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGerenteEmporio from "../../contextos/contexto-gerente-emporio";
import { servicoBuscarEncomendasGerente } from "../../serviços/servicos-gerente-emporio";
import mostrarToast from "../../utilitários/mostrar-toast";
import {
  estilizarBotão,
  estilizarBotãoRetornar,
  estilizarBotãoTabela,
  estilizarCard,
  estilizarDataTable,
  estilizarDivider,
  estilizarFlex,
} from "../../utilitários/estilos";
import { TAMANHOS } from "../../utilitários/constantes";

export default function MinhasEncomendas() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { encomendaConsultada, setEncomendaConsultada } = useContext(ContextoGerenteEmporio);
  const [listaEncomendas, setListaEncomendas] = useState([]);
  const navegar = useNavigate();

  function retornarPáginaInicial() {
    navegar("/pagina-inicial");
  }

  function novaEncomenda() {
    setEncomendaConsultada(null);
    navegar("../catalogo-cervejas");
  }

  function ConsultarTemplate(encomenda) {
    function consultar() {
      setEncomendaConsultada(encomenda);
      navegar("../editar-encomenda");
    }
    return (
      <Button
        icon="pi pi-search"
        className={estilizarBotãoTabela(
          usuárioLogado.cor_tema,
          encomendaConsultada?.id === encomenda.id
        )}
        tooltip="Consultar Encomenda"
        tooltipOptions={{ position: "top" }}
        onClick={consultar}
      />
    );
  }

  function NomeCervejaTemplate(encomenda) {
    return encomenda.cerveja_artesanal?.nome || "";
  }

  function NomeCriadorTemplate(encomenda) {
    return encomenda.cerveja_artesanal?.criador?.usuario?.nome || "";
  }

  function DataTemplate(encomenda) {
    return new Date(encomenda.data).toLocaleDateString();
  }

  function NotaFiscalTemplate(encomenda) {
    return encomenda.nota_fiscal_emitida ? "Sim" : "Não";
  }

  useEffect(() => {
    let desmontado = false;
    async function buscarEncomendasGerente() {
      try {
        const response = await servicoBuscarEncomendasGerente(usuárioLogado.id);
        if (!desmontado && response.data) {
          setListaEncomendas(response.data);
        }
      } catch (error) {
        const erro = error.response?.data?.erro;
        if (erro) mostrarToast(referênciaToast, erro, "erro");
      }
    }
    buscarEncomendasGerente();
    return () => (desmontado = true);
  }, [usuárioLogado.id]);

  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} />
      <Card
        title="Minhas Encomendas"
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
          <Column header="Criador" body={NomeCriadorTemplate} sortable />
          <Column field="quantidade" header="Quantidade" sortable />
          <Column field="valor_total" header="Valor Total" sortable />
          <Column header="Data" body={DataTemplate} sortable />
          <Column header="Nota Fiscal" body={NotaFiscalTemplate} sortable />
          <Column header="Consultar" body={ConsultarTemplate} />
        </DataTable>
        <Divider className={estilizarDivider()} />
        <Button
          className={estilizarBotãoRetornar()}
          label="Retornar"
          onClick={retornarPáginaInicial}
        />
        <Button
          className={estilizarBotão()}
          label="Nova Encomenda"
          onClick={novaEncomenda}
        />
      </Card>
    </div>
  );
}
