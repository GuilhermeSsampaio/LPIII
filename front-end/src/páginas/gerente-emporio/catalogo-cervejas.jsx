import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import ContextoGerenteEmporio from "../../contextos/contexto-gerente-emporio";
import ContextoUsuário from "../../contextos/contexto-usuário";
import { serviçoBuscarTodasCervejasArtesanais } from "../../serviços/serviços-criador";
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

export default function CatalogoCervejas() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { cervejaArtesanalSelecionada, setCervejaArtesanalSelecionada } =
    useContext(ContextoGerenteEmporio);
  const [listaCervejasArtesanais, setListaCervejasArtesanais] = useState([]);
  const navegar = useNavigate();

  function retornarPáginaInicial() {
    navegar("/pagina-inicial");
  }

  function SelecionarTemplate(cervejaArtesanal) {
    function selecionar() {
      setCervejaArtesanalSelecionada(cervejaArtesanal);
      navegar("../fazer-encomenda");
    }
    return (
      <Button
        icon="pi pi-shopping-cart"
        className={estilizarBotãoTabela(
          usuárioLogado.cor_tema,
          cervejaArtesanalSelecionada?.id === cervejaArtesanal.id
        )}
        tooltip="Fazer Encomenda"
        tooltipOptions={{ position: "top" }}
        onClick={selecionar}
      />
    );
  }

  function BooleanBodyTemplate(cervejaArtesanal) {
    if (cervejaArtesanal.contem_gluten) return "Sim";
    else return "Não";
  }

  useEffect(() => {
    let desmontado = false;
    async function buscarTodasCervejasArtesanais() {
      try {
        const response = await serviçoBuscarTodasCervejasArtesanais();
        if (!desmontado && response.data) {
          setListaCervejasArtesanais(response.data);
        }
      } catch (error) {
        const erro = error.response?.data?.erro;
        if (erro) mostrarToast(referênciaToast, erro, "erro");
      }
    }
    buscarTodasCervejasArtesanais();
    return () => (desmontado = true);
  }, []);

  return (
    <div className={estilizarFlex()}>
      <Card
        title="Catálogo de Cervejas Artesanais"
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        <DataTable
          dataKey="id"
          size="small"
          paginator
          rows={TAMANHOS.MAX_LINHAS_TABELA}
          emptyMessage="Nenhuma cerveja artesanal encontrada."
          value={listaCervejasArtesanais}
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
            body={SelecionarTemplate}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
          />
          <Column
            field="nome"
            header="Nome"
            filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
          <Column
            field="teor_alcoolico"
            header="Teor Alcoólico (%)"
            filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
          <Column
            field="categoria"
            header="Categoria"
            filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
          <Column
            field="disponibilidade"
            header="Disponibilidade"
            filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
          <Column
            field="contem_gluten"
            header="Contém Glúten"
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
