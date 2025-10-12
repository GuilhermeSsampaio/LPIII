import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoCriador from "../../contextos/contexto-criador";
import {
  serviçoAlterarCervejaArtesanal,
  serviçoCadastrarCervejaArtesanal,
  serviçoRemoverCervejaArtesanal,
} from "../../serviços/serviços-criador";
import mostrarToast from "../../utilitários/mostrar-toast";
import {
  MostrarMensagemErro,
  checarListaVazia,
  validarCamposObrigatórios,
} from "../../utilitários/validações";
import {
  estilizarBotão,
  estilizarBotãoRemover,
  estilizarBotãoRetornar,
  estilizarCard,
  estilizarDivCampo,
  estilizarFlex,
  estilizarInlineFlex,
  estilizarInputText,
  estilizarInputNumber,
  estilizarLabel,
  estilizarCheckbox,
} from "../../utilitários/estilos";
import { desencriptarCpf } from "../../utilitários/máscaras";

export default function CadastrarCerveja() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { cervejaArtesanalConsultada } = useContext(ContextoCriador);
  const [dados, setDados] = useState({
    nome: cervejaArtesanalConsultada?.nome || "",
    teor_alcoolico: cervejaArtesanalConsultada?.teor_alcoolico || "",
    categoria: cervejaArtesanalConsultada?.categoria || "",
    disponibilidade: cervejaArtesanalConsultada?.disponibilidade || "ano_todo",
    contem_gluten: cervejaArtesanalConsultada?.contem_gluten ?? true,
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
    const { nome, categoria } = dados;
    let errosCamposObrigatórios = validarCamposObrigatórios({
      nome,
      categoria,
    });
    setErros(errosCamposObrigatórios);
    return checarListaVazia(errosCamposObrigatórios);
  }

  function retornarGerenciarCervejas() {
    navegar("../gerenciar-cervejas");
  }

  async function cadastrarCerveja() {
    if (validarCampos()) {
      try {
        const cpf = desencriptarCpf(usuárioLogado.cpf);
        const dadosAjustados = {
          ...dados,
          cpf,
        };

        await serviçoCadastrarCervejaArtesanal(dadosAjustados);
        mostrarToast(
          referênciaToast,
          "success",
          "Sucesso",
          "Cerveja cadastrada com sucesso!"
        );
        retornarGerenciarCervejas();
      } catch (error) {
        const mensagemErro =
          error.response?.data?.erro || "Erro ao cadastrar cerveja";
        mostrarToast(referênciaToast, "error", "Erro", mensagemErro);
      }
    }
  }

  async function alterarCerveja() {
    if (validarCampos()) {
      try {
        const dadosAjustados = {
          ...dados,
          id: cervejaArtesanalConsultada.id,
        };
        await serviçoAlterarCervejaArtesanal(dadosAjustados);
        mostrarToast(
          referênciaToast,
          "success",
          "Sucesso",
          "Cerveja alterada com sucesso!"
        );
        retornarGerenciarCervejas();
      } catch (error) {
        const mensagemErro =
          error.response?.data?.erro || "Erro ao alterar cerveja";
        mostrarToast(referênciaToast, "error", "Erro", mensagemErro);
      }
    }
  }

  async function removerCerveja() {
    try {
      await serviçoRemoverCervejaArtesanal(cervejaArtesanalConsultada.id);
      mostrarToast(
        referênciaToast,
        "success",
        "Sucesso",
        "Cerveja removida com sucesso!"
      );
      retornarGerenciarCervejas();
    } catch (error) {
      const mensagemErro =
        error.response?.data?.erro || "Erro ao remover cerveja";
      mostrarToast(referênciaToast, "error", "Erro", mensagemErro);
    }
  }

  function títuloFormulário() {
    if (cervejaArtesanalConsultada) return "Editar Cerveja Artesanal";
    return "Cadastrar Cerveja Artesanal";
  }

  return (
    <>
      <Toast ref={referênciaToast} position="bottom-center" />
      <Card
        title={títuloFormulário()}
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Nome*:
          </label>
          <InputText
            name="nome"
            className={estilizarInputText(erros.nome, usuárioLogado.cor_tema)}
            value={dados.nome}
            onChange={alterarEstado}
          />
          <MostrarMensagemErro mensagem={erros.nome} />
        </div>
        <br />
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Teor Alcoolico (%):
          </label>
          <InputNumber
            name="teor_alcoolico"
            className={estilizarInputNumber(
              erros.teor_alcoolico,
              usuárioLogado.cor_tema
            )}
            value={dados.teor_alcoolico}
            onValueChange={alterarEstado}
            mode="decimal"
            minFractionDigits={1}
            maxFractionDigits={2}
          />
          <MostrarMensagemErro mensagem={erros.teor_alcoolico} />
        </div>
        <br />
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Categoria*:
          </label>
          <InputText
            name="categoria"
            className={estilizarInputText(
              erros.categoria,
              usuárioLogado.cor_tema
            )}
            value={dados.categoria}
            onChange={alterarEstado}
          />
          <MostrarMensagemErro mensagem={erros.categoria} />
        </div>
        <br />
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Disponibilidade:
          </label>
          <InputText
            name="disponibilidade"
            className={estilizarInputText(
              erros.disponibilidade,
              usuárioLogado.cor_tema
            )}
            value={dados.disponibilidade}
            onChange={alterarEstado}
          />
          <MostrarMensagemErro mensagem={erros.disponibilidade} />
        </div>
        <br />
        <div className={estilizarInlineFlex("flex-start", "center")}>
          <Checkbox
            name="contem_gluten"
            className={estilizarCheckbox(usuárioLogado.cor_tema)}
            checked={dados.contem_gluten}
            onChange={alterarEstado}
          />
          <label
            style={{ marginLeft: "8px" }}
            className={estilizarLabel(usuárioLogado.cor_tema)}
          >
            Contem Gluten
          </label>
        </div>
        <br />
        <div className={estilizarFlex("space-between", "center")}>
          <div className={estilizarFlex("flex-start", "center")}>
            {cervejaArtesanalConsultada ? (
              <>
                <Button
                  label="Alterar"
                  className={estilizarBotão(usuárioLogado.cor_tema)}
                  onClick={alterarCerveja}
                />
                <Button
                  label="Remover"
                  className={estilizarBotãoRemover()}
                  onClick={removerCerveja}
                  style={{ marginLeft: "10px" }}
                />
              </>
            ) : (
              <Button
                label="Cadastrar"
                className={estilizarBotão(usuárioLogado.cor_tema)}
                onClick={cadastrarCerveja}
              />
            )}
          </div>
          <Button
            label="Retornar"
            icon="pi pi-arrow-left"
            className={estilizarBotãoRetornar(usuárioLogado.cor_tema)}
            onClick={retornarGerenciarCervejas}
          />
        </div>
      </Card>
    </>
  );
}
