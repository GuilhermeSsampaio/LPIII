import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import {
  serviçoCadastrarMaestro,
  serviçoBuscarMaestro,
} from "../../serviços/serviços-maestro";
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
  estilizarDropdown,
  estilizarFlex,
  estilizarInlineFlex,
  estilizarInputNumber,
  estilizarLabel,
} from "../../utilitários/estilos";

export default function CadastrarMaestro() {
  const referênciaToast = useRef(null);
  const { usuárioLogado, setUsuárioLogado } = useContext(ContextoUsuário);
  const [dados, setDados] = useState({
    nacionalidade: "",
    anos_experiência: "",
  });
  const [erros, setErros] = useState({});
  const [cpfExistente, setCpfExistente] = useState(false);
  const navegar = useNavigate();

  const opçõesNacionalidade = [
    { label: "Estrangeiro", value: "estrangeiro" },
    { label: "Brasileiro", value: "brasileiro" },
  ];

  const opçõesEstilo = [
    { label: "Moderno", value: "moderno" },
    { label: "Barroco", value: "barroco" },
    { label: "Romântico", value: "romântico" },
    { label: "Contemporâneo", value: "contemporaneo" },
  ];

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
    if (usuárioLogado?.cadastrado) return "Consultar Maestro";
    else return "Cadastrar Maestro";
  }

  async function cadastrarMaestro() {
    if (validarCampos()) {
      try {
        const response = await serviçoCadastrarMaestro({
          ...dados,
          usuário_info: usuárioLogado,
          nacionalidade: dados.nacionalidade,
          anos_experiência: dados.anos_experiência,
          estilo: dados.estilo,
        });

        if (response.data)
          setUsuárioLogado((usuário) => ({
            ...usuário,
            status: response.data.status,
            token: response.data.token,
          }));

        mostrarToast(
          referênciaToast,
          "Maestro cadastrado com sucesso!",
          "sucesso"
        );
      } catch (error) {
        setCpfExistente(true);
        mostrarToast(referênciaToast, error.response.data.erro, "erro");
      }
    }
  }

  function labelBotãoSalvar() {
    if (usuárioLogado?.cadastrado) return "Consultar";
    else return "Cadastrar";
  }

  function açãoBotãoSalvar() {
    if (!usuárioLogado?.cadastrado) cadastrarMaestro();
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
    async function buscarDadosMaestro() {
      try {
        const response = await serviçoBuscarMaestro(usuárioLogado.cpf);
        if (!desmontado && response.data) {
          setDados((dados) => ({
            ...dados,
            nacionalidade: response.data.nacionalidade,
            anos_experiência: response.data.anos_experiência,
            estilo: response.data.estilo,
          }));
        }
      } catch (error) {
        const erro = error.response.data.erro;
        if (erro) mostrarToast(referênciaToast, erro, "erro");
      }
    }

    if (usuárioLogado?.cadastrado) buscarDadosMaestro();
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
            Titulação*:
          </label>
          <br />
          <Dropdown
            name="nacionalidade"
            className={estilizarDropdown(
              erros.nacionalidade,
              usuárioLogado.cor_tema
            )}
            value={dados.nacionalidade}
            options={opçõesNacionalidade}
            onChange={alterarEstado}
            placeholder="-- Selecione --"
          />
          <br />
          <Dropdown
            name="estilo"
            className={estilizarDropdown(erros.estilo, usuárioLogado.cor_tema)}
            value={dados.estilo}
            options={opçõesEstilo}
            onChange={alterarEstado}
            placeholder="-- Selecione --"
          />
          <MostrarMensagemErro mensagem={erros.nacionalidade} />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Anos de Experiência*:
          </label>
          <InputNumber
            name="anos_experiência"
            size={5}
            value={dados.anos_experiência}
            onValueChange={alterarEstado}
            mode="decimal"
            inputClassName={estilizarInputNumber(
              erros.anos_experiência,
              usuárioLogado.cor_tema
            )}
          />
          <MostrarMensagemErro mensagem={erros.anos_experiência} />
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
