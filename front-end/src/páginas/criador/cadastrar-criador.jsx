import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import {
  serviçoCadastrarCriador,
  serviçoAtualizarCriador,
  serviçoBuscarCriador,
} from "../../serviços/serviços-criador";
import mostrarToast from "../../utilitários/mostrar-toast";
import {
  MostrarMensagemErro,
  checarListaVazia,
  validarCamposObrigatórios,
} from "../../utilitários/validações";
import {
  estilizarBotão,
  estilizarCard,
  estilizarDivBotõesAção,
  estilizarDivCampo,
  estilizarInputText,
  estilizarLabel,
} from "../../utilitários/estilos";

export default function CadastrarCriador() {
  const referênciaToast = useRef(null);
  const { usuárioLogado, setUsuárioLogado } = useContext(ContextoUsuário);
  const [dados, setDados] = useState({
    pais_origem: "",
    ano_fundacao: "",
    estilo_cerveja_especializado: "",
  });
  const [erros, setErros] = useState({});
  const navegar = useNavigate();

  function alterarEstado(event) {
    const chave = event.target.name || event.value;
    const valor = event.target.value;
    setDados({ ...dados, [chave]: valor });
  }

  function validarCampos() {
    let errosCamposObrigatórios;
    errosCamposObrigatórios = validarCamposObrigatórios(dados);
    setErros(errosCamposObrigatórios);
    return checarListaVazia(errosCamposObrigatórios);
  }

  function títuloFormulário() {
    if (usuárioLogado?.cadastrado) return "Alterar Criador";
    return "Cadastrar Criador";
  }

  async function submeterFormulário(evento) {
    evento.preventDefault();
    if (!validarCampos()) return;
    if (usuárioLogado?.cadastrado) {
      await atualizarCriador();
    } else {
      await cadastrarCriador();
    }
  }

  async function cadastrarCriador() {
    try {
      const { confirmaçãoUsuário } = usuárioLogado;
      const response = await serviçoCadastrarCriador({
        usuário_info: confirmaçãoUsuário,
        pais_origem: dados.pais_origem,
        ano_fundacao: parseInt(dados.ano_fundacao),
        estilo_cerveja_especializado: dados.estilo_cerveja_especializado,
      });
      const { status, token } = response.data;
      setUsuárioLogado({
        ...usuárioLogado,
        token,
        status,
        cadastrado: true,
      });
      mostrarToast(
        referênciaToast,
        "success",
        "Sucesso",
        "Criador cadastrado com sucesso!"
      );
      navegar("/pagina-inicial");
    } catch (error) {
      const mensagemErro =
        error.response?.data?.erro || "Erro ao cadastrar Criador";
      mostrarToast(referênciaToast, "error", "Erro", mensagemErro);
    }
  }

  async function atualizarCriador() {
    try {
      await serviçoAtualizarCriador({
        cpf: usuárioLogado.cpf,
        pais_origem: dados.pais_origem,
        ano_fundacao: parseInt(dados.ano_fundacao),
        estilo_cerveja_especializado: dados.estilo_cerveja_especializado,
      });
      mostrarToast(
        referênciaToast,
        "success",
        "Sucesso",
        "Criador atualizado com sucesso!"
      );
    } catch (error) {
      const mensagemErro =
        error.response?.data?.erro || "Erro ao atualizar Criador";
      mostrarToast(referênciaToast, "error", "Erro", mensagemErro);
    }
  }

  async function buscarDados() {
    try {
      const response = await serviçoBuscarCriador(usuárioLogado.cpf);
      const criador = response.data;
      setDados({
        pais_origem: criador.pais_origem,
        ano_fundacao: criador.ano_fundacao,
        estilo_cerveja_especializado: criador.estilo_cerveja_especializado,
      });
    } catch (error) {
      mostrarToast(
        referênciaToast,
        "error",
        "Erro",
        "Erro ao buscar dados do Criador"
      );
    }
  }

  useState(() => {
    if (usuárioLogado?.cadastrado) {
      buscarDados();
    }
  }, []);

  return (
    <>
      <Toast ref={referênciaToast} position="bottom-center" />
      <Card
        title={títuloFormulário()}
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Pais de Origem*:
          </label>
          <InputText
            name="pais_origem"
            className={estilizarInputText(erros.pais_origem, usuárioLogado.cor_tema)}
            value={dados.pais_origem}
            onChange={alterarEstado}
          />
          <MostrarMensagemErro mensagem={erros.pais_origem} />
        </div>
        <br />
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Ano de Fundacao*:
          </label>
          <InputText
            name="ano_fundacao"
            className={estilizarInputText(erros.ano_fundacao, usuárioLogado.cor_tema)}
            value={dados.ano_fundacao}
            onChange={alterarEstado}
            type="number"
          />
          <MostrarMensagemErro mensagem={erros.ano_fundacao} />
        </div>
        <br />
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Estilo de Cerveja Especializado*:
          </label>
          <InputText
            name="estilo_cerveja_especializado"
            className={estilizarInputText(
              erros.estilo_cerveja_especializado,
              usuárioLogado.cor_tema
            )}
            value={dados.estilo_cerveja_especializado}
            onChange={alterarEstado}
          />
          <MostrarMensagemErro mensagem={erros.estilo_cerveja_especializado} />
        </div>
        <br />
        <div className={estilizarDivBotõesAção()}>
          <Button
            label={usuárioLogado?.cadastrado ? "Alterar" : "Cadastrar"}
            className={estilizarBotão(usuárioLogado.cor_tema)}
            onClick={submeterFormulário}
          />
        </div>
      </Card>
    </>
  );
}
