import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import ContextoCriador from "../../contextos/contexto-criador";
import ContextoUsuário from "../../contextos/contexto-usuário";
import { serviçoBuscarCervejasArtesanaisCriador } from "../../serviços/serviços-criador";
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

export default function GerenciarCervejas() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { cervejaArtesanalConsultada, setCervejaArtesanalConsultada } =
    useContext(ContextoCriador);
  const [listaCervejasArtesanais, setListaCervejasArtesanais] = useState([]);
  const navegar = useNavigate();

  function retornarPáginaInicial() {
    navegar("/pagina-inicial");
  }

  function adicionarCervejaArtesanal() {
    setCervejaArtesanalConsultada(null);
    navegar("../cadastrar-cerveja-artesanal");
  }

  function ConsultarTemplate(cervejaArtesanal) {
    function consultar() {
      setCervejaArtesanalConsultada(cervejaArtesanal);
      navegar("../cadastrar-cerveja-artesanal");
    }
    return (
      <Button
        icon="pi pi-search"
        className={estilizarBotãoTabela(
          usuárioLogado.cor_tema,
          cervejaArtesanalConsultada?.id === cervejaArtesanal.id
        )}
        tooltip="Consultar Cerveja Artesanal"
        tooltipOptions={{ position: "top" }}
        onClick={consultar}
      />
    );
  }

  function BooleanBodyTemplate(cervejaArtesanal) {
    if (cervejaArtesanal.contem_gluten) return "Sim";
    else return "Não";
  }

  useEffect(() => {
    let desmontado = false;
    async function buscarCervejasArtesanaisCriador() {
      try {
        const response = await serviçoBuscarCervejasArtesanaisCriador(
          usuárioLogado.cpf
        );
        if (!desmontado && response.data) {
          setListaCervejasArtesanais(response.data);
        }
      } catch (error) {
        const erro = error.response.data.erro;
        if (erro) mostrarToast(referênciaToast, erro, "erro");
      }
    }
    buscarCervejasArtesanaisCriador();
    return () => (desmontado = true);
  }, [usuárioLogado.cpf]);

  return (
    <div className={estilizarFlex()}>
      <Card
        title="Gerenciar Cervejas Artesanais"
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
            body={ConsultarTemplate}
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
        <Button
          className={estilizarBotão()}
          label="Adicionar"
          onClick={adicionarCervejaArtesanal}
        />
      </Card>
    </div>
  );
}
