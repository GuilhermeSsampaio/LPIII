import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoCriador from "../../contextos/contexto-criador";
import {
  servicoAlterarCerveja,
  servicoCadastrarCerveja,
  servicoRemoverCerveja,
} from "../../serviços/servicos-criador";
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
  estilizarInputText,
  estilizarInputNumber,
  estilizarLabel,
  estilizarCheckbox,
} from "../../utilitários/estilos";

export default function CadastrarCerveja() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { cervejaConsultada } = useContext(ContextoCriador);
  const [dados, setDados] = useState({
    nome: cervejaConsultada?.nome || "",
    teor_alcoolico: cervejaConsultada?.teor_alcoolico || "",
    categoria: cervejaConsultada?.categoria || "",
    disponibilidade: cervejaConsultada?.disponibilidade || "ano_todo",
    contem_gluten: cervejaConsultada?.contem_gluten ?? true,
  });
  const [erros, setErros] = useState({});
  const navegar = useNavigate();

  function alterarEstado(event) {
    const chave = event.target.name;
    let valor = event.target.value !== undefined ? event.target.value : event.checked;
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
        const dadosAjustados = {
          ...dados,
          usuario_id: usuárioLogado.id,
        };

        await servicoCadastrarCerveja(dadosAjustados);
        mostrarToast(
          referênciaToast,
          "Cerveja cadastrada com sucesso!",
          "sucesso"
        );
        setTimeout(retornarGerenciarCervejas, 1500);
      } catch (error) {
        mostrarToast(referênciaToast, error.response?.data?.erro || "Erro ao cadastrar", "erro");
      }
    }
  }

  async function alterarCerveja() {
    if (validarCampos()) {
      try {
        const dadosAjustados = {
          ...dados,
          id: cervejaConsultada.id,
        };

        await servicoAlterarCerveja(dadosAjustados);
        mostrarToast(
          referênciaToast,
          "Cerveja alterada com sucesso!",
          "sucesso"
        );
        setTimeout(retornarGerenciarCervejas, 1500);
      } catch (error) {
        mostrarToast(referênciaToast, error.response?.data?.erro || "Erro ao alterar", "erro");
      }
    }
  }

  async function removerCerveja() {
    try {
      await servicoRemoverCerveja(cervejaConsultada.id);
      mostrarToast(
        referênciaToast,
        "Cerveja removida com sucesso!",
        "sucesso"
      );
      setTimeout(retornarGerenciarCervejas, 1500);
    } catch (error) {
      mostrarToast(referênciaToast, error.response?.data?.erro || "Erro ao remover", "erro");
    }
  }

  function labelBotãoSalvar() {
    if (cervejaConsultada) return "Alterar";
    else return "Cadastrar";
  }

  function açãoBotãoSalvar() {
    if (cervejaConsultada) alterarCerveja();
    else cadastrarCerveja();
  }

  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} />
      <Card
        title={cervejaConsultada ? "Alterar Cerveja" : "Cadastrar Cerveja"}
        className={estilizarCard(usuárioLogado?.cor_tema)}
      >
        <div className={estilizarDivCampo()}>
          <label htmlFor="nome" className={estilizarLabel()}>
            Nome da Cerveja *
          </label>
          <InputText
            id="nome"
            name="nome"
            value={dados.nome}
            onChange={alterarEstado}
            className={estilizarInputText(erros.nome)}
          />
        </div>

        <div className={estilizarDivCampo()}>
          <label htmlFor="categoria" className={estilizarLabel()}>
            Categoria *
          </label>
          <InputText
            id="categoria"
            name="categoria"
            value={dados.categoria}
            onChange={alterarEstado}
            className={estilizarInputText(erros.categoria)}
          />
        </div>

        <div className={estilizarDivCampo()}>
          <label htmlFor="teor_alcoolico" className={estilizarLabel()}>
            Teor Alcoólico (%)
          </label>
          <InputNumber
            id="teor_alcoolico"
            name="teor_alcoolico"
            value={dados.teor_alcoolico}
            onValueChange={(e) => setDados({ ...dados, teor_alcoolico: e.value })}
            className={estilizarInputNumber()}
            minFractionDigits={2}
            maxFractionDigits={2}
          />
        </div>

        <div className={estilizarDivCampo()}>
          <label htmlFor="disponibilidade" className={estilizarLabel()}>
            Disponibilidade
          </label>
          <InputText
            id="disponibilidade"
            name="disponibilidade"
            value={dados.disponibilidade}
            onChange={alterarEstado}
            className={estilizarInputText()}
          />
        </div>

        <div className={estilizarDivCampo()}>
          <label htmlFor="contem_gluten" className={estilizarLabel()}>
            Contém Glúten
          </label>
          <Checkbox
            inputId="contem_gluten"
            name="contem_gluten"
            checked={dados.contem_gluten}
            onChange={alterarEstado}
            className={estilizarCheckbox(usuárioLogado?.cor_tema)}
          />
        </div>

        <Divider className={estilizarDivider()} />
        <Button
          className={estilizarBotãoRetornar()}
          label="Retornar"
          onClick={retornarGerenciarCervejas}
        />
        {cervejaConsultada && (
          <Button
            className={estilizarBotãoRemover()}
            label="Remover"
            onClick={removerCerveja}
          />
        )}
        <Button
          className={estilizarBotão()}
          label={labelBotãoSalvar()}
          onClick={açãoBotãoSalvar}
        />
      </Card>
    </div>
  );
}
