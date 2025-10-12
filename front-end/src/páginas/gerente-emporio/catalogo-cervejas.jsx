import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import ContextoGerenteEmporio from "../../contextos/contexto-gerente-emporio";
import ContextoUsuário from "../../contextos/contexto-usuário";
import { serviçoBuscarTodasCervejasArtesanais } from "../../serviços/serviços-criador";
import mostrarToast from "../../utilitários/mostrar-toast";
import {
  estilizarBotãoRetornar,
  estilizarBotãoTabela,
  estilizarCard,
  estilizarDataTable,
  estilizarFlex,
} from "../../utilitários/estilos";

export default function CatalogoCervejas() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { cervejaArtesanalSelecionada, setCervejaArtesanalSelecionada } =
    useContext(ContextoGerenteEmporio);
  const [listaCervejas, setListaCervejas] = useState([]);
  const navegar = useNavigate();

  function retornarPáginaInicial() {
    navegar("/pagina-inicial");
  }

  function SelecionarTemplate(cerveja) {
    function selecionar() {
      setCervejaArtesanalSelecionada(cerveja);
      navegar("../fazer-encomenda");
    }
    return (
      <Button
        icon="pi pi-shopping-cart"
        className={estilizarBotãoTabela(
          usuárioLogado.cor_tema,
          cervejaArtesanalSelecionada?.id === cerveja.id
        )}
        tooltip="Fazer Encomenda"
        tooltipOptions={{ position: "top" }}
        onClick={selecionar}
      />
    );
  }

  function BooleanBodyTemplate(cerveja) {
    if (cerveja.contem_gluten) return "Sim";
    else return "Não";
  }

  function CriadorBodyTemplate(cerveja) {
    return cerveja.criador?.usuário?.nome || "N/A";
  }

  async function buscarCervejas() {
    try {
      const response = await serviçoBuscarTodasCervejasArtesanais();
      setListaCervejas(response.data);
    } catch (error) {
      mostrarToast(
        referênciaToast,
        "error",
        "Erro",
        "Erro ao buscar catálogo de cervejas"
      );
    }
  }

  useEffect(() => {
    buscarCervejas();
  }, []);

  return (
    <>
      <Toast ref={referênciaToast} position="bottom-center" />
      <Card
        title="Catalogo de Cervejas Artesanais"
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        <div className={estilizarFlex("flex-end", "center")}>
          <Button
            label="Retornar"
            icon="pi pi-arrow-left"
            className={estilizarBotãoRetornar(usuárioLogado.cor_tema)}
            onClick={retornarPáginaInicial}
          />
        </div>
        <br />
        <DataTable
          value={listaCervejas}
          paginator
          rows={10}
          className={estilizarDataTable(usuárioLogado.cor_tema)}
          emptyMessage="Nenhuma cerveja disponível"
        >
          <Column field="nome" header="Nome" sortable filter />
          <Column
            field="teor_alcoolico"
            header="Teor Alcoolico (%)"
            sortable
            filter
          />
          <Column field="categoria" header="Categoria" sortable filter />
          <Column
            field="disponibilidade"
            header="Disponibilidade"
            sortable
            filter
          />
          <Column
            field="contem_gluten"
            header="Contem Gluten"
            body={BooleanBodyTemplate}
            sortable
            filter
          />
          <Column
            header="Criador"
            body={CriadorBodyTemplate}
            sortable
            filter
          />
          <Column body={SelecionarTemplate} header="Encomendar" />
        </DataTable>
      </Card>
    </>
  );
}
