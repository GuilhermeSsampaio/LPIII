import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import ContextoGerenteEmporio from "../../contextos/contexto-gerente-emporio";
import ContextoUsuário from "../../contextos/contexto-usuário";
import { serviçoBuscarEncomendasGerenteEmporio } from "../../serviços/serviços-gerente-emporio";
import mostrarToast from "../../utilitários/mostrar-toast";
import {
  TAMANHOS,
  estilizarBotão,
  estilizarBotãoRetornar,
  estilizarBotãoTabela,
  estilizarCard,
  estilizarColunaConsultar,
  estilizarColumnHeader,
  estilizarDataTable,
  estilizarDataTablePaginator,
  estilizarDivider,
  estilizarFlex,
} from "../../utilitários/estilos";

export default function MinhasEncomendas() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { encomendaConsultada, setEncomendaConsultada } =
    useContext(ContextoGerenteEmporio);
  const [listaEncomendas, setListaEncomendas] = useState([]);
  const navegar = useNavigate();

  function retornarPáginaInicial() {
    navegar("/pagina-inicial");
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

  function DataBodyTemplate(encomenda) {
    const data = new Date(encomenda.data);
    return data.toLocaleDateString('pt-BR');
  }

  function BooleanBodyTemplate(encomenda) {
    if (encomenda.nota_fiscal_emitida) return "Sim";
    else return "Não";
  }

  useEffect(() => {
    let desmontado = false;
    async function buscarEncomendasGerenteEmporio() {
      try {
        const response = await serviçoBuscarEncomendasGerenteEmporio(
          usuárioLogado.cpf
        );
        if (!desmontado && response.data) {
          setListaEncomendas(response.data);
        }
      } catch (error) {
        const erro = error.response?.data?.erro;
        if (erro) mostrarToast(referênciaToast, erro, "erro");
      }
    }
    buscarEncomendasGerenteEmporio();
    return () => (desmontado = true);
  }, [usuárioLogado.cpf]);

  return (
    <div className={estilizarFlex()}>
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
            field="cerveja_artesanal.nome"
            header="Cerveja"
            filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
          <Column
            field="quantidade"
            header="Quantidade"
            filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
          <Column
            field="valor_total"
            header="Valor Total"
            filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
          <Column
            field="data"
            header="Data"
            body={DataBodyTemplate}
            filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
          <Column
            field="nota_fiscal_emitida"
            header="Nota Fiscal"
            body={BooleanBodyTemplate}
            filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
        </DataTable>
        <Divider className={estilizarDivider(usuárioLogado.cor_tema)} />
        <Button
          className={estilizarBotãoRetornar()}
          label="Retornar"
          onClick={retornarPáginaInicial}
        />
      </Card>
    </div>
  );
}
