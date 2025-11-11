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
  estilizarDivider,
  estilizarFlex,
  estilizarInlineFlex,
  estilizarInputText,
  estilizarInputNumber,
  estilizarLabel,
  estilizarCheckbox,
} from "../../utilitários/estilos";

export default function CadastrarCervejaArtesanal() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { cervejaArtesanalConsultada } = useContext(ContextoCriador);
  const [dados, setDados] = useState({
    nome: cervejaArtesanalConsultada?.nome || "",
    teor_alcoolico: cervejaArtesanalConsultada?.teor_alcoolico || "",
    categoria: cervejaArtesanalConsultada?.categoria || "",
    disponibilidade: cervejaArtesanalConsultada?.disponibilidade || "ano_todo",
    contem_gluten: cervejaArtesanalConsultada?.contem_gluten !== undefined ? cervejaArtesanalConsultada.contem_gluten : true,
  });
  const [erros, setErros] = useState({});
  const navegar = useNavigate();

  function alterarEstado(event) {
    const chave = event.target.name || event.value;
    let valor = event.target.value || event.checked;
    setDados({ ...dados, [chave]: valor });
  }

  function validarCampos() {
    const { nome, teor_alcoolico, categoria, disponibilidade } = dados;
    let errosCamposObrigatórios = validarCamposObrigatórios({
      nome,
      teor_alcoolico,
      categoria,
      disponibilidade,
    });
    setErros(errosCamposObrigatórios);
    return checarListaVazia(errosCamposObrigatórios);
  }

  function retornarGerenciarCervejas() {
    navegar("../gerenciar-cervejas");
  }

  async function cadastrarCervejaArtesanal() {
    if (validarCampos()) {
      try {
        const dadosAjustados = {
          ...dados,
          cpf: usuárioLogado.cpf,
        };

        await serviçoCadastrarCervejaArtesanal(dadosAjustados);
        mostrarToast(
          referênciaToast,
          "Cerveja Artesanal cadastrada com sucesso!",
          "sucesso"
        );
      } catch (error) {
        mostrarToast(referênciaToast, error.response.data.erro, "erro");
      }
    }
  }

  async function alterarCervejaArtesanal() {
    if (validarCampos()) {
      try {
        const dadosAjustados = {
          ...dados,
          id: cervejaArtesanalConsultada.id,
        };

        await serviçoAlterarCervejaArtesanal(dadosAjustados);
        mostrarToast(
          referênciaToast,
          "Cerveja Artesanal alterada com sucesso!",
          "sucesso"
        );
      } catch (error) {
        mostrarToast(referênciaToast, error.response.data.erro, "erro");
      }
    }
  }

  async function removerCervejaArtesanal() {
    try {
      await serviçoRemoverCervejaArtesanal(cervejaArtesanalConsultada.id);
      mostrarToast(
        referênciaToast,
        "Cerveja Artesanal removida com sucesso!",
        "sucesso"
      );
    } catch (error) {
      mostrarToast(referênciaToast, error.response.data.erro, "erro");
    }
  }

  function labelBotãoSalvar() {
    if (cervejaArtesanalConsultada) return "Alterar";
    else return "Cadastrar";
  }

  function açãoBotãoSalvar() {
    if (cervejaArtesanalConsultada) alterarCervejaArtesanal();
    else cadastrarCervejaArtesanal();
  }

  function títuloFormulário() {
    if (cervejaArtesanalConsultada) return "Alterar Cerveja Artesanal";
    else return "Cadastrar Cerveja Artesanal";
  }

  return (
    <div className={estilizarFlex()}>
      <Toast
        ref={referênciaToast}
        onHide={retornarGerenciarCervejas}
        position="bottom-center"
      />
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
            Teor Alcoólico (%)*:
          </label>
          <InputNumber
            name="teor_alcoolico"
            size={5}
            value={dados.teor_alcoolico}
            onValueChange={alterarEstado}
            mode="decimal"
            minFractionDigits={1}
            maxFractionDigits={2}
            inputClassName={estilizarInputNumber(
              erros.teor_alcoolico,
              usuárioLogado.cor_tema
            )}
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
            className={estilizarInputText(erros.categoria, usuárioLogado.cor_tema)}
            value={dados.categoria}
            onChange={alterarEstado}
          />
          <MostrarMensagemErro mensagem={erros.categoria} />
        </div>
        <br />
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Disponibilidade*:
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
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Contém Glúten:
          </label>
          <Checkbox
            name="contem_gluten"
            className={estilizarCheckbox(usuárioLogado.cor_tema)}
            checked={dados.contem_gluten}
            onChange={alterarEstado}
          />
        </div>
        <Divider className={estilizarDivider(usuárioLogado.cor_tema)} />
        <div className={estilizarInlineFlex()}>
          <Button
            className={estilizarBotãoRetornar()}
            label="Retornar"
            onClick={retornarGerenciarCervejas}
          />
          {cervejaArtesanalConsultada && (
            <Button
              className={estilizarBotãoRemover()}
              label="Remover"
              onClick={removerCervejaArtesanal}
            />
          )}
          <Button
            className={estilizarBotão()}
            label={labelBotãoSalvar()}
            onClick={açãoBotãoSalvar}
          />
        </div>
      </Card>
    </div>
  );
}
