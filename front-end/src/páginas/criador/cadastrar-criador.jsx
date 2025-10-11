import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import {
  servicoCadastrarCriador,
  servicoBuscarCriador,
  servicoAtualizarCriador,
} from "../../serviços/servicos-criador";
import mostrarToast from "../../utilitários/mostrar-toast";
import {
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
  estilizarInputText,
  estilizarInputNumber,
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
    const chave = event.target.name;
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
        const response = await servicoCadastrarCriador({
          ...dados,
          usuario_info: usuárioLogado,
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
        redirecionar();
      } catch (error) {
        mostrarToast(referênciaToast, error.response?.data?.erro || "Erro ao cadastrar", "erro");
      }
    }
  }

  async function atualizarCriador() {
    if (validarCampos()) {
      try {
        await servicoAtualizarCriador({
          ...dados,
          id: usuárioLogado.id,
        });
        mostrarToast(
          referênciaToast,
          "Criador atualizado com sucesso!",
          "sucesso"
        );
      } catch (error) {
        mostrarToast(referênciaToast, error.response?.data?.erro || "Erro ao atualizar", "erro");
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
    setUsuárioLogado((usuárioLogado) => ({
      ...usuárioLogado,
      cadastrado: true,
    }));
    navegar("/pagina-inicial");
  }

  useEffect(() => {
    let desmontado = false;
    async function buscarDadosCriador() {
      try {
        const response = await servicoBuscarCriador(usuárioLogado.id);
        if (!desmontado && response.data) {
          setDados({
            pais_origem: response.data.pais_origem || "",
            ano_fundacao: response.data.ano_fundacao || "",
            estilo_cerveja_especializado: response.data.estilo_cerveja_especializado || "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (usuárioLogado?.cadastrado) buscarDadosCriador();
    return () => (desmontado = true);
  }, [usuárioLogado]);

  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} />
      <Card title={títuloFormulário()} className={estilizarCard(usuárioLogado?.cor_tema)}>
        <div className={estilizarDivCampo()}>
          <label htmlFor="pais_origem" className={estilizarLabel()}>
            País de Origem
          </label>
          <InputText
            id="pais_origem"
            name="pais_origem"
            value={dados.pais_origem}
            onChange={alterarEstado}
            className={estilizarInputText(erros.pais_origem)}
          />
        </div>

        <div className={estilizarDivCampo()}>
          <label htmlFor="ano_fundacao" className={estilizarLabel()}>
            Ano de Fundação
          </label>
          <InputNumber
            id="ano_fundacao"
            name="ano_fundacao"
            value={dados.ano_fundacao}
            onValueChange={(e) => setDados({ ...dados, ano_fundacao: e.value })}
            className={estilizarInputNumber(erros.ano_fundacao)}
            useGrouping={false}
          />
        </div>

        <div className={estilizarDivCampo()}>
          <label htmlFor="estilo_cerveja_especializado" className={estilizarLabel()}>
            Estilo de Cerveja Especializado
          </label>
          <InputText
            id="estilo_cerveja_especializado"
            name="estilo_cerveja_especializado"
            value={dados.estilo_cerveja_especializado}
            onChange={alterarEstado}
            className={estilizarInputText(erros.estilo_cerveja_especializado)}
          />
        </div>

        <Divider className={estilizarDivider()} />
        <Button
          className={estilizarBotão()}
          label={labelBotãoSalvar()}
          onClick={açãoBotãoSalvar}
        />
      </Card>
    </div>
  );
}
