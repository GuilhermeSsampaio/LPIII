import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import {
  serviçoCadastrarGerenteEmporio,
  serviçoAtualizarGerenteEmporio,
  serviçoBuscarGerenteEmporio,
} from "../../serviços/serviços-gerente-emporio";
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
import { desencriptarCpf } from "../../utilitários/máscaras";

export default function CadastrarGerenteEmporio() {
  const referênciaToast = useRef(null);
  const { usuárioLogado, setUsuárioLogado } = useContext(ContextoUsuário);
  const [dados, setDados] = useState({
    telefone: "",
    localizacao_pais: "",
    nivel_experiencia: "",
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
    if (usuárioLogado?.cadastrado) return "Alterar Gerente de Emporio";
    return "Cadastrar Gerente de Emporio";
  }

  async function submeterFormulário(evento) {
    evento.preventDefault();
    if (!validarCampos()) return;
    if (usuárioLogado?.cadastrado) {
      await atualizarGerenteEmporio();
    } else {
      await cadastrarGerenteEmporio();
    }
  }

  async function cadastrarGerenteEmporio() {
    try {
      const { confirmaçãoUsuário } = usuárioLogado;
      const response = await serviçoCadastrarGerenteEmporio({
        usuário_info: confirmaçãoUsuário,
        telefone: dados.telefone,
        localizacao_pais: dados.localizacao_pais,
        nivel_experiencia: dados.nivel_experiencia,
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
        "Gerente de Emporio cadastrado com sucesso!"
      );
      navegar("/pagina-inicial");
    } catch (error) {
      const mensagemErro =
        error.response?.data?.erro || "Erro ao cadastrar Gerente de Emporio";
      mostrarToast(referênciaToast, "error", "Erro", mensagemErro);
    }
  }

  async function atualizarGerenteEmporio() {
    try {
      const cpf = desencriptarCpf(usuárioLogado.cpf);
      await serviçoAtualizarGerenteEmporio({
        cpf,
        telefone: dados.telefone,
        localizacao_pais: dados.localizacao_pais,
        nivel_experiencia: dados.nivel_experiencia,
      });
      mostrarToast(
        referênciaToast,
        "success",
        "Sucesso",
        "Gerente de Emporio atualizado com sucesso!"
      );
    } catch (error) {
      const mensagemErro =
        error.response?.data?.erro || "Erro ao atualizar Gerente de Emporio";
      mostrarToast(referênciaToast, "error", "Erro", mensagemErro);
    }
  }

  async function buscarDados() {
    try {
      const cpf = desencriptarCpf(usuárioLogado.cpf);
      const response = await serviçoBuscarGerenteEmporio(cpf);
      const gerenteEmporio = response.data;
      setDados({
        telefone: gerenteEmporio.telefone,
        localizacao_pais: gerenteEmporio.localizacao_pais,
        nivel_experiencia: gerenteEmporio.nivel_experiencia,
      });
    } catch (error) {
      mostrarToast(
        referênciaToast,
        "error",
        "Erro",
        "Erro ao buscar dados do Gerente de Emporio"
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
            Telefone*:
          </label>
          <InputText
            name="telefone"
            className={estilizarInputText(erros.telefone, usuárioLogado.cor_tema)}
            value={dados.telefone}
            onChange={alterarEstado}
          />
          <MostrarMensagemErro mensagem={erros.telefone} />
        </div>
        <br />
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Pais de Localizacao*:
          </label>
          <InputText
            name="localizacao_pais"
            className={estilizarInputText(erros.localizacao_pais, usuárioLogado.cor_tema)}
            value={dados.localizacao_pais}
            onChange={alterarEstado}
          />
          <MostrarMensagemErro mensagem={erros.localizacao_pais} />
        </div>
        <br />
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Nivel de Experiencia*:
          </label>
          <InputText
            name="nivel_experiencia"
            className={estilizarInputText(
              erros.nivel_experiencia,
              usuárioLogado.cor_tema
            )}
            value={dados.nivel_experiencia}
            onChange={alterarEstado}
          />
          <MostrarMensagemErro mensagem={erros.nivel_experiencia} />
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
