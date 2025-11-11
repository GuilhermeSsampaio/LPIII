import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import {
  serviçoCadastrarGerenteEmporio,
  serviçoBuscarGerenteEmporio,
  serviçoAtualizarGerenteEmporio,
} from "../../serviços/serviços-gerente-emporio";
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
  estilizarInputText,
  estilizarLabel,
} from "../../utilitários/estilos";

export default function CadastrarGerenteEmporio() {
  const referênciaToast = useRef(null);
  const { usuárioLogado, setUsuárioLogado } = useContext(ContextoUsuário);
  const [dados, setDados] = useState({
    telefone: "",
    localizacao_pais: "",
    nivel_experiencia: "",
  });
  const [erros, setErros] = useState({});
  const [cpfExistente, setCpfExistente] = useState(false);
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
    if (usuárioLogado?.cadastrado) return "Alterar Gerente de Empório";
    return "Cadastrar Gerente de Empório";
  }

  async function cadastrarGerenteEmporio() {
    if (validarCampos()) {
      try {
        const response = await serviçoCadastrarGerenteEmporio({
          ...dados,
          usuário_info: usuárioLogado,
          telefone: dados.telefone,
          localizacao_pais: dados.localizacao_pais,
          nivel_experiencia: dados.nivel_experiencia,
        });

        if (response.data)
          setUsuárioLogado((usuário) => ({
            ...usuário,
            status: response.data.status,
            token: response.data.token,
          }));

        mostrarToast(
          referênciaToast,
          "Gerente de Empório cadastrado com sucesso!",
          "sucesso"
        );
      } catch (error) {
        setCpfExistente(true);
        mostrarToast(referênciaToast, error.response.data.erro, "erro");
      }
    }
  }

  async function atualizarGerenteEmporio() {
    if (validarCampos()) {
      try {
        const response = await serviçoAtualizarGerenteEmporio({
          ...dados,
          cpf: usuárioLogado.cpf,
        });
        if (response)
          mostrarToast(
            referênciaToast,
            "Gerente de Empório atualizado com sucesso!",
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
    if (usuárioLogado?.cadastrado) atualizarGerenteEmporio();
    else cadastrarGerenteEmporio();
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
    async function buscarDadosGerenteEmporio() {
      try {
        const response = await serviçoBuscarGerenteEmporio(usuárioLogado.cpf);
        if (!desmontado && response.data) {
          setDados((dados) => ({
            ...dados,
            telefone: response.data.telefone,
            localizacao_pais: response.data.localizacao_pais,
            nivel_experiencia: response.data.nivel_experiencia,
          }));
        }
      } catch (error) {
        const erro = error.response.data.erro;
        if (erro) mostrarToast(referênciaToast, erro, "erro");
      }
    }

    if (usuárioLogado?.cadastrado) buscarDadosGerenteEmporio();
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
            País de Localização*:
          </label>
          <InputText
            name="localizacao_pais"
            className={estilizarInputText(
              erros.localizacao_pais,
              usuárioLogado.cor_tema
            )}
            value={dados.localizacao_pais}
            onChange={alterarEstado}
          />
          <MostrarMensagemErro mensagem={erros.localizacao_pais} />
        </div>
        <br />
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Nível de Experiência*:
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
