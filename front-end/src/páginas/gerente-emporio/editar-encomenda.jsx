import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGerenteEmporio from "../../contextos/contexto-gerente-emporio";
import {
  servicoAlterarEncomenda,
  servicoRemoverEncomenda,
} from "../../serviços/servicos-gerente-emporio";
import mostrarToast from "../../utilitários/mostrar-toast";
import {
  checarListaVazia,
  validarCamposObrigatórios,
} from "../../utilitários/validações";
import {
  estilizarBotão,
  estilizarBotãoRemover,
  estilizarBotãoRetornar,
  estilizarCard,
  estilizarDivCampo,
  estilizarDivider,
  estilizarFlex,
  estilizarInputNumber,
  estilizarLabel,
  estilizarCheckbox,
} from "../../utilitários/estilos";

export default function EditarEncomenda() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { encomendaConsultada } = useContext(ContextoGerenteEmporio);
  const [dados, setDados] = useState({
    quantidade: encomendaConsultada?.quantidade || "",
    valor_total: encomendaConsultada?.valor_total || "",
    nota_fiscal_emitida: encomendaConsultada?.nota_fiscal_emitida || false,
  });
  const [erros, setErros] = useState({});
  const navegar = useNavigate();

  function validarCampos() {
    const { quantidade, valor_total } = dados;
    let errosCamposObrigatórios = validarCamposObrigatórios({
      quantidade,
      valor_total,
    });
    setErros(errosCamposObrigatórios);
    return checarListaVazia(errosCamposObrigatórios);
  }

  function retornarMinhasEncomendas() {
    navegar("../minhas-encomendas");
  }

  async function alterarEncomenda() {
    if (validarCampos()) {
      try {
        const dadosAjustados = {
          ...dados,
          id: encomendaConsultada.id,
        };

        await servicoAlterarEncomenda(dadosAjustados);
        mostrarToast(
          referênciaToast,
          "Encomenda alterada com sucesso!",
          "sucesso"
        );
        setTimeout(retornarMinhasEncomendas, 1500);
      } catch (error) {
        mostrarToast(referênciaToast, error.response?.data?.erro || "Erro ao alterar", "erro");
      }
    }
  }

  async function removerEncomenda() {
    try {
      await servicoRemoverEncomenda(encomendaConsultada.id);
      mostrarToast(
        referênciaToast,
        "Encomenda removida com sucesso!",
        "sucesso"
      );
      setTimeout(retornarMinhasEncomendas, 1500);
    } catch (error) {
      mostrarToast(referênciaToast, error.response?.data?.erro || "Erro ao remover", "erro");
    }
  }

  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} />
      <Card
        title="Editar Encomenda"
        className={estilizarCard(usuárioLogado?.cor_tema)}
      >
        {encomendaConsultada && (
          <div className={estilizarDivCampo()}>
            <label className={estilizarLabel()}>
              Cerveja: <strong>{encomendaConsultada.cerveja_artesanal?.nome}</strong>
            </label>
          </div>
        )}

        <div className={estilizarDivCampo()}>
          <label htmlFor="quantidade" className={estilizarLabel()}>
            Quantidade *
          </label>
          <InputNumber
            id="quantidade"
            name="quantidade"
            value={dados.quantidade}
            onValueChange={(e) => setDados({ ...dados, quantidade: e.value })}
            className={estilizarInputNumber(erros.quantidade)}
            useGrouping={false}
          />
        </div>

        <div className={estilizarDivCampo()}>
          <label htmlFor="valor_total" className={estilizarLabel()}>
            Valor Total *
          </label>
          <InputNumber
            id="valor_total"
            name="valor_total"
            value={dados.valor_total}
            onValueChange={(e) => setDados({ ...dados, valor_total: e.value })}
            className={estilizarInputNumber(erros.valor_total)}
            mode="currency"
            currency="BRL"
            locale="pt-BR"
          />
        </div>

        <div className={estilizarDivCampo()}>
          <label htmlFor="nota_fiscal_emitida" className={estilizarLabel()}>
            Nota Fiscal Emitida
          </label>
          <Checkbox
            inputId="nota_fiscal_emitida"
            name="nota_fiscal_emitida"
            checked={dados.nota_fiscal_emitida}
            onChange={(e) => setDados({ ...dados, nota_fiscal_emitida: e.checked })}
            className={estilizarCheckbox(usuárioLogado?.cor_tema)}
          />
        </div>

        <Divider className={estilizarDivider()} />
        <Button
          className={estilizarBotãoRetornar()}
          label="Retornar"
          onClick={retornarMinhasEncomendas}
        />
        <Button
          className={estilizarBotãoRemover()}
          label="Remover"
          onClick={removerEncomenda}
        />
        <Button
          className={estilizarBotão()}
          label="Alterar"
          onClick={alterarEncomenda}
        />
      </Card>
    </div>
  );
}
