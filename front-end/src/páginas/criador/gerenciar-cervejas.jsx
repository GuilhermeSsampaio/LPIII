import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoCriador from "../../contextos/contexto-criador";
import { servicoBuscarCervejasCriador } from "../../serviços/servicos-criador";
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

export default function GerenciarCervejas() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { cervejaConsultada, setCervejaConsultada } = useContext(ContextoCriador);
  const [listaCervejas, setListaCervejas] = useState([]);
  const navegar = useNavigate();

  function retornarPáginaInicial() {
    navegar("/pagina-inicial");
  }

  function adicionarCerveja() {
    setCervejaConsultada(null);
    navegar("../cadastrar-cerveja");
  }

  function ConsultarTemplate(cerveja) {
    function consultar() {
      setCervejaConsultada(cerveja);
      navegar("../cadastrar-cerveja");
    }
    return (
      <Button
        icon="pi pi-search"
        className={estilizarBotãoTabela(
          usuárioLogado.cor_tema,
          cervejaConsultada?.id === cerveja.id
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

  useEffect(() => {
    let desmontado = false;
    async function buscarCervejasCriador() {
      try {
        const response = await servicoBuscarCervejasCriador(usuárioLogado.id);
        if (!desmontado && response.data) {
          setListaCervejas(response.data);
        }
      } catch (error) {
        const erro = error.response?.data?.erro;
        if (erro) mostrarToast(referênciaToast, erro, "erro");
      }
    }
    buscarCervejasCriador();
    return () => (desmontado = true);
  }, [usuárioLogado.id]);

  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} />
      <Card
        title="Gerenciar Cervejas"
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        <DataTable
          dataKey="id"
          size="small"
          paginator
          rows={TAMANHOS.MAX_LINHAS_TABELA}
          emptyMessage="Nenhuma cerveja encontrada."
          value={listaCervejas}
          responsiveLayout="scroll"
          breakpoint="490px"
          removableSort
          className={estilizarDataTable()}
        >
          <Column field="nome" header="Nome" sortable filter />
          <Column field="categoria" header="Categoria" sortable filter />
          <Column field="teor_alcoolico" header="Teor Alcoólico (%)" sortable />
          <Column field="disponibilidade" header="Disponibilidade" sortable filter />
          <Column 
            field="contem_gluten" 
            header="Contém Glúten" 
            body={BooleanBodyTemplate}
            sortable 
          />
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
          label="Adicionar"
          onClick={adicionarCerveja}
        />
      </Card>
    </div>
  );
}
