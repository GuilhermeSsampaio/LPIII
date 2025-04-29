import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import ContextoUsuário from "../../contextos/contexto-usuário";
import Contextopatrocinador from "../../contextos/contexto-patrocinador";
import { serviçoBuscarPeçasMusicais } from "../../serviços/serviços-patrocinador";
import mostrarToast from "../../utilitários/mostrar-toast";
import {
  TAMANHOS,
  estilizarBotãoRetornar,
  estilizarBotãoTabela,
  estilizarCard,
  estilizarColumnHeader,
  estilizarColunaConsultar,
  estilizarDataTable,
  estilizarDataTablePaginator,
  estilizarDivider,
  estilizarFilterMenu,
  estilizarFlex,
  estilizarTriStateCheckbox,
} from "../../utilitários/estilos";
export default function PesquisarPeçasMusicais() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const {
    peçaMusicalConsultada,
    setPeçaMusicalConsultada,
    setPeçaMusicalSelecionada,
  } = useContext(Contextopatrocinador);
  const [listaPeçasMusicais, setListaPeçasMusicais] = useState([]);
  const navegar = useNavigate();
  const opçõesCategoria = [
    { label: "Extensão", value: "Extensão" },
    { label: "Iniciação Científica", value: "Iniciação Científica" },
    { label: "TCC", value: "TCC" },
  ];
  function retornarCadastrarPatrocínio() {
    setPeçaMusicalSelecionada(peçaMusicalConsultada);
    setPeçaMusicalConsultada(null);
    navegar("../cadastrar-patrocínio");
  }
  function ConsultarTemplate(peçaMusical) {
    return (
      <Button
        icon="pi pi-search"
        className={estilizarBotãoTabela(
          usuárioLogado.cor_tema,
          peçaMusicalConsultada?.id === peçaMusical.id
        )}
        tooltip="Consultar PeçaMusical"
        tooltipOptions={{ position: "top" }}
        onClick={() => {
          setPeçaMusicalConsultada(peçaMusical);
          navegar("../consultar-peçaMusical");
        }}
      />
    );
  }
  function DropdownÁreaTemplate(opções) {
    function alterarFiltroDropdown(event) {
      return opções.filterCallback(event.value, opções.index);
    }
    return (
      <Dropdown
        value={opções.value}
        options={opçõesCategoria}
        placeholder="Selecione"
        onChange={alterarFiltroDropdown}
        showClear
      />
    );
  }
  function BooleanBodyTemplate(peçaMusical) {
    if (peçaMusical.concorrendo_bolsa) return "Sim";
    else return "Não";
  }
  function BooleanFilterTemplate(opções) {
    function alterarFiltroTriState(event) {
      return opções.filterCallback(event.value);
    }
    return (
      <div>
        <label>Concorrendo à bolsa:</label>
        <TriStateCheckbox
          className={estilizarTriStateCheckbox(usuárioLogado?.cor_tema)}
          value={opções.value}
          onChange={alterarFiltroTriState}
        />
      </div>
    );
  }
  useEffect(() => {
    let desmontado = false;
    async function buscarPeçasMusicais() {
      try {
        const response = await serviçoBuscarPeçasMusicais();
        if (!desmontado && response.data) setListaPeçasMusicais(response.data);
      } catch (error) {
        mostrarToast(referênciaToast, error.response.data.erro, "error");
      }
    }
    buscarPeçasMusicais();
    return () => (desmontado = true);
  }, [usuárioLogado.cpf]);
  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} position="bottom-center" />
      <Card
        title="Pesquisar PeçasMusicais"
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        <DataTable
          dataKey="id"
          size="small"
          paginator
          rows={TAMANHOS.MAX_LINHAS_TABELA}
          emptyMessage="Nenhuma peçaMusical encontrada."
          value={listaPeçasMusicais}
          responsiveLayout="scroll"
          breakpoint="490px"
          removableSort
          className={estilizarDataTable()}
          paginatorClassName={estilizarDataTablePaginator(
            usuárioLogado.cor_tema
          )}
        >
          <Column
            bodyClassName={estilizarColunaConsultar()}
            body={ConsultarTemplate}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
          />
          <Column
            field="professor.usuário.nome"
            header="Nome do Professor"
            filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
          <Column
            field="título"
            header="Título"
            filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
          <Column
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            field="categoria"
            header="Categoria"
            filter
            filterMatchMode="equals"
            filterElement={DropdownÁreaTemplate}
            showClearButton={false}
            showFilterOperator={false}
            showFilterMatchModes={false}
            filterMenuClassName={estilizarFilterMenu()}
            showFilterMenuOptions={false}
            sortable
          />
          <Column
            field="área_atuação"
            header="Área de Atuação"
            filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
          <Column
            field="concorrendo_bolsa"
            header="Concorrendo à bolsa"
            dataType="boolean"
            filter
            showFilterOperator={false}
            body={BooleanBodyTemplate}
            filterElement={BooleanFilterTemplate}
            filterMatchMode="equals"
            showClearButton={false}
            showAddButton={false}
            filterMenuClassName={estilizarFilterMenu()}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
        </DataTable>
        <Divider className={estilizarDivider()} />
        <Button
          className={estilizarBotãoRetornar()}
          label="Retornar"
          onClick={retornarCadastrarPatrocínio}
        />
      </Card>
    </div>
  );
}
