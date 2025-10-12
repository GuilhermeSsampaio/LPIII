import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import ContextoGerenteEmporio from "../../contextos/contexto-gerente-emporio";
import ContextoUsuário from "../../contextos/contexto-usuário";
import {
  serviçoBuscarEncomendasGerenteEmporio,
  serviçoRemoverEncomenda,
} from "../../serviços/serviços-gerente-emporio";
import mostrarToast from "../../utilitários/mostrar-toast";
import { desencriptarCpf } from "../../utilitários/máscaras";
import {
  estilizarBotão,
  estilizarBotãoRemover,
  estilizarBotãoRetornar,
  estilizarBotãoTabela,
  estilizarCard,
  estilizarDataTable,
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

  function EditarTemplate(encomenda) {
    function editar() {
      setEncomendaConsultada(encomenda);
      navegar("../editar-encomenda");
    }
    return (
      <Button
        icon="pi pi-pencil"
        className={estilizarBotãoTabela(
          usuárioLogado.cor_tema,
          encomendaConsultada?.id === encomenda.id
        )}
        tooltip="Editar Encomenda"
        tooltipOptions={{ position: "top" }}
        onClick={editar}
      />
    );
  }

  function RemoverTemplate(encomenda) {
    async function remover() {
      try {
        await serviçoRemoverEncomenda(encomenda.id);
        mostrarToast(
          referênciaToast,
          "success",
          "Sucesso",
          "Encomenda removida com sucesso!"
        );
        buscarEncomendas();
      } catch (error) {
        const mensagemErro =
          error.response?.data?.erro || "Erro ao remover encomenda";
        mostrarToast(referênciaToast, "error", "Erro", mensagemErro);
      }
    }
    return (
      <Button
        icon="pi pi-trash"
        className={estilizarBotãoRemover()}
        tooltip="Remover Encomenda"
        tooltipOptions={{ position: "top" }}
        onClick={remover}
      />
    );
  }

  function BooleanBodyTemplate(encomenda) {
    if (encomenda.nota_fiscal_emitida) return "Sim";
    else return "Não";
  }

  function CervejaBodyTemplate(encomenda) {
    return encomenda.cerveja_artesanal?.nome || "N/A";
  }

  function DataBodyTemplate(encomenda) {
    return new Date(encomenda.data).toLocaleDateString("pt-BR");
  }

  function ValorBodyTemplate(encomenda) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(encomenda.valor_total);
  }

  async function buscarEncomendas() {
    try {
      const cpf = desencriptarCpf(usuárioLogado.cpf);
      const response = await serviçoBuscarEncomendasGerenteEmporio(cpf);
      setListaEncomendas(response.data);
    } catch (error) {
      mostrarToast(
        referênciaToast,
        "error",
        "Erro",
        "Erro ao buscar encomendas"
      );
    }
  }

  useEffect(() => {
    buscarEncomendas();
  }, []);

  return (
    <>
      <Toast ref={referênciaToast} position="bottom-center" />
      <Card
        title="Minhas Encomendas"
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
          value={listaEncomendas}
          paginator
          rows={10}
          className={estilizarDataTable(usuárioLogado.cor_tema)}
          emptyMessage="Nenhuma encomenda cadastrada"
        >
          <Column
            header="Data"
            body={DataBodyTemplate}
            sortable
            filter
          />
          <Column
            header="Cerveja"
            body={CervejaBodyTemplate}
            sortable
            filter
          />
          <Column field="quantidade" header="Quantidade" sortable filter />
          <Column
            header="Valor Total"
            body={ValorBodyTemplate}
            sortable
            filter
          />
          <Column
            header="Nota Fiscal"
            body={BooleanBodyTemplate}
            sortable
            filter
          />
          <Column body={EditarTemplate} header="Editar" />
          <Column body={RemoverTemplate} header="Remover" />
        </DataTable>
      </Card>
    </>
  );
}
