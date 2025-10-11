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
import { servicoBuscarCervejas } from "../../serviços/servicos-gerente-emporio";
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

export default function CatalogoCervejas() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { cervejaSelecionada, setCervejaSelecionada } = useContext(ContextoGerenteEmporio);
  const [listaCervejas, setListaCervejas] = useState([]);
  const navegar = useNavigate();

  function retornarPáginaInicial() {
    navegar("/pagina-inicial");
  }

  function fazerEncomenda() {
    if (cervejaSelecionada) {
      navegar("../fazer-encomenda");
    } else {
      mostrarToast(referênciaToast, "Selecione uma cerveja para fazer encomenda", "aviso");
    }
  }

  function SelecionarTemplate(cerveja) {
    function selecionar() {
      setCervejaSelecionada(cerveja);
    }
    return (
      <Button
        icon="pi pi-check"
        className={estilizarBotãoTabela(
          usuárioLogado.cor_tema,
          cervejaSelecionada?.id === cerveja.id
        )}
        tooltip="Selecionar Cerveja"
        tooltipOptions={{ position: "top" }}
        onClick={selecionar}
      />
    );
  }

  function NomeCriadorTemplate(cerveja) {
    return cerveja.criador?.usuario?.nome || "";
  }

  function BooleanBodyTemplate(cerveja) {
    if (cerveja.contem_gluten) return "Sim";
    else return "Não";
  }

  useEffect(() => {
    let desmontado = false;
    async function buscarCervejas() {
      try {
        const response = await servicoBuscarCervejas();
        if (!desmontado && response.data) {
          setListaCervejas(response.data);
        }
      } catch (error) {
        const erro = error.response?.data?.erro;
        if (erro) mostrarToast(referênciaToast, erro, "erro");
      }
    }
    buscarCervejas();
    return () => (desmontado = true);
  }, []);

  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} />
      <Card
        title="Catálogo de Cervejas"
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
          <Column header="Criador" body={NomeCriadorTemplate} sortable />
          <Column field="categoria" header="Categoria" sortable filter />
          <Column field="teor_alcoolico" header="Teor Alcoólico (%)" sortable />
          <Column field="disponibilidade" header="Disponibilidade" sortable filter />
          <Column 
            field="contem_gluten" 
            header="Contém Glúten" 
            body={BooleanBodyTemplate}
            sortable 
          />
          <Column header="Selecionar" body={SelecionarTemplate} />
        </DataTable>
        <Divider className={estilizarDivider()} />
        <Button
          className={estilizarBotãoRetornar()}
          label="Retornar"
          onClick={retornarPáginaInicial}
        />
        <Button
          className={estilizarBotão()}
          label="Fazer Encomenda"
          onClick={fazerEncomenda}
        />
      </Card>
    </div>
  );
}
