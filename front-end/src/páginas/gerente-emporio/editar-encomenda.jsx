import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGerenteEmporio from "../../contextos/contexto-gerente-emporio";
import { serviçoAlterarEncomenda } from "../../serviços/serviços-gerente-emporio";
import mostrarToast from "../../utilitários/mostrar-toast";
import {
  MostrarMensagemErro,
  checarListaVazia,
  validarCamposObrigatórios,
} from "../../utilitários/validações";
import {
  estilizarBotão,
  estilizarBotãoRetornar,
  estilizarCard,
  estilizarDivCampo,
  estilizarFlex,
  estilizarInlineFlex,
  estilizarInputNumber,
  estilizarLabel,
  estilizarCheckbox,
} from "../../utilitários/estilos";

export default function EditarEncomenda() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { encomendaConsultada } = useContext(ContextoGerenteEmporio);
  const [dados, setDados] = useState({
    quantidade: encomendaConsultada?.quantidade || 1,
    valor_total: encomendaConsultada?.valor_total || 0,
    nota_fiscal_emitida: encomendaConsultada?.nota_fiscal_emitida || false,
  });
  const [erros, setErros] = useState({});
  const navegar = useNavigate();

  function alterarEstado(event) {
    const chave = event.target.name || event.value;
    let valor = event.target.value;
    if (event.checked !== undefined) {
      valor = event.checked;
    }
    setDados({ ...dados, [chave]: valor });
  }

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
        if (!encomendaConsultada) {
          mostrarToast(
            referênciaToast,
            "error",
            "Erro",
            "Nenhuma encomenda selecionada"
          );
          return;
        }
        const dadosAjustados = {
          ...dados,
          id: encomendaConsultada.id,
        };

        await serviçoAlterarEncomenda(dadosAjustados);
        mostrarToast(
          referênciaToast,
          "success",
          "Sucesso",
          "Encomenda alterada com sucesso!"
        );
        retornarMinhasEncomendas();
      } catch (error) {
        const mensagemErro =
          error.response?.data?.erro || "Erro ao alterar encomenda";
        mostrarToast(referênciaToast, "error", "Erro", mensagemErro);
      }
    }
  }

  return (
    <>
      <Toast ref={referênciaToast} position="bottom-center" />
      <Card
        title="Editar Encomenda"
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        {encomendaConsultada ? (
          <>
            <div className={estilizarDivCampo()}>
              <label className={estilizarLabel(usuárioLogado.cor_tema)}>
                Cerveja:
              </label>
              <p>{encomendaConsultada.cerveja_artesanal?.nome}</p>
            </div>
            <br />
            <div className={estilizarDivCampo()}>
              <label className={estilizarLabel(usuárioLogado.cor_tema)}>
                Quantidade*:
              </label>
              <InputNumber
                name="quantidade"
                className={estilizarInputNumber(
                  erros.quantidade,
                  usuárioLogado.cor_tema
                )}
                value={dados.quantidade}
                onValueChange={alterarEstado}
                min={1}
              />
              <MostrarMensagemErro mensagem={erros.quantidade} />
            </div>
            <br />
            <div className={estilizarDivCampo()}>
              <label className={estilizarLabel(usuárioLogado.cor_tema)}>
                Valor Total*:
              </label>
              <InputNumber
                name="valor_total"
                className={estilizarInputNumber(
                  erros.valor_total,
                  usuárioLogado.cor_tema
                )}
                value={dados.valor_total}
                onValueChange={alterarEstado}
                mode="currency"
                currency="BRL"
                locale="pt-BR"
              />
              <MostrarMensagemErro mensagem={erros.valor_total} />
            </div>
            <br />
            <div className={estilizarInlineFlex("flex-start", "center")}>
              <Checkbox
                name="nota_fiscal_emitida"
                className={estilizarCheckbox(usuárioLogado.cor_tema)}
                checked={dados.nota_fiscal_emitida}
                onChange={alterarEstado}
              />
              <label
                style={{ marginLeft: "8px" }}
                className={estilizarLabel(usuárioLogado.cor_tema)}
              >
                Nota Fiscal Emitida
              </label>
            </div>
            <br />
            <div className={estilizarFlex("space-between", "center")}>
              <Button
                label="Alterar Encomenda"
                className={estilizarBotão(usuárioLogado.cor_tema)}
                onClick={alterarEncomenda}
              />
              <Button
                label="Retornar"
                icon="pi pi-arrow-left"
                className={estilizarBotãoRetornar(usuárioLogado.cor_tema)}
                onClick={retornarMinhasEncomendas}
              />
            </div>
          </>
        ) : (
          <div>
            <p>Nenhuma encomenda selecionada. Retorne à lista.</p>
            <br />
            <Button
              label="Retornar"
              icon="pi pi-arrow-left"
              className={estilizarBotãoRetornar(usuárioLogado.cor_tema)}
              onClick={retornarMinhasEncomendas}
            />
          </div>
        )}
      </Card>
    </>
  );
}
