import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import ContextoCriador from "../../contextos/contexto-criador";
import ContextoUsuário from "../../contextos/contexto-usuário";
import { serviçoBuscarCervejasArtesanaisCriador } from "../../serviços/serviços-criador";
import mostrarToast from "../../utilitários/mostrar-toast";

import {
  estilizarBotão,
  estilizarBotãoRetornar,
  estilizarBotãoTabela,
  estilizarCard,
  estilizarDataTable,
  estilizarFlex,
} from "../../utilitários/estilos";

export default function GerenciarCervejas() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { cervejaArtesanalConsultada, setCervejaArtesanalConsultada } =
    useContext(ContextoCriador);
  const [listaCervejas, setListaCervejas] = useState([]);
  const navegar = useNavigate();

  function retornarPáginaInicial() {
    navegar("/pagina-inicial");
  }

  function adicionarCerveja() {
    setCervejaArtesanalConsultada(null);
    navegar("../cadastrar-cerveja");
  }

  function ConsultarTemplate(cerveja) {
    function consultar() {
      setCervejaArtesanalConsultada(cerveja);
      navegar("../cadastrar-cerveja");
    }
    return (
      <Button
        icon="pi pi-search"
        className={estilizarBotãoTabela(
          usuárioLogado.cor_tema,
          cervejaArtesanalConsultada?.id === cerveja.id
        )}
        tooltip="Consultar Cerveja"
        tooltipOptions={{ position: "top" }}
        onClick={consultar}
      />
    );
  }

  function BooleanBodyTemplate(cerveja) {
    if (cerveja.contem_gluten) return "Sim";
    else return "Não";
  }

  async function buscarCervejas() {
    try {
      const cpf = usuárioLogado.cpf;
      const response = await serviçoBuscarCervejasArtesanaisCriador(cpf);
      setListaCervejas(response.data);
    } catch (error) {
      mostrarToast(
        referênciaToast,
        "error",
        "Erro",
        "Erro ao buscar cervejas artesanais"
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
        title="Gerenciar Cervejas Artesanais"
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        <div className={estilizarFlex("space-between", "center")}>
          <Button
            label="Adicionar"
            icon="pi pi-plus"
            className={estilizarBotão(usuárioLogado.cor_tema)}
            onClick={adicionarCerveja}
          />
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
          emptyMessage="Nenhuma cerveja cadastrada"
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
          <Column body={ConsultarTemplate} header="Consultar" />
        </DataTable>
      </Card>
    </>
  );
}
