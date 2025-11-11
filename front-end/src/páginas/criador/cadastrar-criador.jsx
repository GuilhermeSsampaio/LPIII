import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import {
  serviçoCadastrarCriador,
  serviçoBuscarCriador,
  serviçoAtualizarCriador,
} from "../../serviços/serviços-criador";
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
  estilizarDivider,
  estilizarFlex,
  estilizarInlineFlex,
  estilizarInputNumber,
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
  const [cpfExistente, setCpfExistente] = useState(false);
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

  async function cadastrarCriador() {
    if (validarCampos()) {
      try {
        const response = await serviçoCadastrarCriador({
          ...dados,
          usuário_info: usuárioLogado,
          pais_origem: dados.pais_origem,
          ano_fundacao: dados.ano_fundacao,
          estilo_cerveja_especializado: dados.estilo_cerveja_especializado,
        });

        if (response.data)
          setUsuárioLogado((usuário) => ({
            ...usuário,
            status: response.data.status,
            token: response.data.token,
          }));

        mostrarToast(
          referênciaToast,
          "Criador cadastrado com sucesso!",
          "sucesso"
        );
      } catch (error) {
        setCpfExistente(true);
        mostrarToast(referênciaToast, error.response.data.erro, "erro");
      }
    }
  }

  async function atualizarCriador() {
    if (validarCampos()) {
      try {
        const response = await serviçoAtualizarCriador({
          ...dados,
          cpf: usuárioLogado.cpf,
        });
        if (response)
          mostrarToast(
            referênciaToast,
            "Criador atualizado com sucesso!",
            "sucesso"
          );
      } catch (error) {
        mostrarToast(referênciaToast, error.response.data.erro, "erro");
      }
    }
  }

  function labelBotãoSalvar() {
    if (usuárioLogado?.cadastrado) return "Alterar";
    else return "Cadastrar";
  }

  function açãoBotãoSalvar() {
    if (usuárioLogado?.cadastrado) atualizarCriador();
    else cadastrarCriador();
  }

  function redirecionar() {
    if (cpfExistente) {
      setUsuárioLogado(null);
      navegar("/criar-usuario");
    } else {
      setUsuárioLogado((usuárioLogado) => ({
        ...usuárioLogado,
        cadastrado: true,
      }));
      navegar("/pagina-inicial");
    }
  }

  useEffect(() => {
    let desmontado = false;
    async function buscarDadosCriador() {
      try {
        const response = await serviçoBuscarCriador(usuárioLogado.cpf);
        if (!desmontado && response.data) {
          setDados((dados) => ({
            ...dados,
            pais_origem: response.data.pais_origem,
            ano_fundacao: response.data.ano_fundacao,
            estilo_cerveja_especializado: response.data.estilo_cerveja_especializado,
          }));
        }
      } catch (error) {
        const erro = error.response.data.erro;
        if (erro) mostrarToast(referênciaToast, erro, "erro");
      }
    }

    if (usuárioLogado?.cadastrado) buscarDadosCriador();
    return () => (desmontado = true);
  }, [usuárioLogado?.cadastrado, usuárioLogado.cpf]);

  return (
    <div className={estilizarFlex()}>
      <Toast
        ref={referênciaToast}
        onHide={redirecionar}
        position="bottom-center"
      />
      <Card
        title={títuloFormulário()}
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            País de Origem*:
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
            Ano de Fundação*:
          </label>
          <InputNumber
            name="ano_fundacao"
            size={5}
            value={dados.ano_fundacao}
            onValueChange={alterarEstado}
            mode="decimal"
            useGrouping={false}
            inputClassName={estilizarInputNumber(
              erros.ano_fundacao,
              usuárioLogado.cor_tema
            )}
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
        <Divider className={estilizarDivider(dados.cor_tema)} />
        <div className={estilizarInlineFlex()}>
          <Button
            className={estilizarBotãoRetornar()}
            label="Retornar"
            onClick={redirecionar}
          />
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
