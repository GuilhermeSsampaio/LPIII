import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoMaestro from "../../contextos/contexto-maestro";
import {
  serviçoAlterarPeçaMusical,
  serviçoCadastrarPeçaMusical,
  serviçoRemoverPeçaMusical,
  serviçoBuscarPatrocíniosPeçasMusicais,
} from "../../serviços/serviços-maestro";
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
  estilizarDropdown,
  estilizarFlex,
  estilizarInlineFlex,
  estilizarInputText,
  estilizarInputNumber,
  estilizarLabel,
} from "../../utilitários/estilos";

export default function CadastrarPeçaMusical() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { propostaConsultada } = useContext(ContextoMaestro);
  const [dados, setDados] = useState({
    título: propostaConsultada?.título || "",
    duração: propostaConsultada?.duração || "",
    tom: propostaConsultada?.tom || "",
    estilo: propostaConsultada?.estilo || "",
  });
  const [listaEstilos, setListaEstilos] = useState([]);
  const [erros, setErros] = useState({});
  const navegar = useNavigate();

  const opçõesEstilo = [
    { label: "Clássico", value: "clássico" },
    { label: "Pop", value: "pop" },
    { label: "Rock", value: "rock" },
  ];

  function alterarEstado(event) {
    const chave = event.target.name || event.value;
    let valor = event.target.value || event.checked;
    setDados({ ...dados, [chave]: valor });
  }

  function validarCampos() {
    const { título, duração, tom, estilo } = dados;
    let errosCamposObrigatórios = validarCamposObrigatórios({
      título,
      duração,
      tom,
      estilo,
    });
    setErros(errosCamposObrigatórios);
    return checarListaVazia(errosCamposObrigatórios);
  }

  function retornarAdministrarPeçasMusicais() {
    navegar("../administrar-pecas-musicais");
  }

  async function cadastrarPeçaMusical() {
    if (validarCampos()) {
      try {
        await serviçoCadastrarPeçaMusical({ ...dados, cpf: usuárioLogado.cpf });
        mostrarToast(
          referênciaToast,
          "Peça Musical cadastrada com sucesso!",
          "sucesso"
        );
      } catch (error) {
        mostrarToast(referênciaToast, error.response.data.erro, "erro");
      }
    }
  }

  async function alterarPeçaMusical() {
    if (validarCampos()) {
      try {
        await serviçoAlterarPeçaMusical({
          ...dados,
          id: propostaConsultada.id,
        });
        mostrarToast(
          referênciaToast,
          "Peça Musical alterada com sucesso!",
          "sucesso"
        );
      } catch (error) {
        mostrarToast(referênciaToast, error.response.data.erro, "erro");
      }
    }
  }

  async function removerPeçaMusical() {
    try {
      await serviçoRemoverPeçaMusical(propostaConsultada.id);
      mostrarToast(
        referênciaToast,
        "Peça Musical excluída com sucesso!",
        "sucesso"
      );
    } catch (error) {
      mostrarToast(referênciaToast, error.response.data.erro, "erro");
    }
  }

  function BotõesAções() {
    if (propostaConsultada) {
      return (
        <div className={estilizarInlineFlex()}>
          <Button
            className={estilizarBotãoRetornar()}
            label="Retornar"
            onClick={retornarAdministrarPeçasMusicais}
          />
          <Button
            className={estilizarBotãoRemover()}
            label="Remover"
            onClick={removerPeçaMusical}
          />
          <Button
            className={estilizarBotão()}
            label="Alterar"
            onClick={alterarPeçaMusical}
          />
        </div>
      );
    } else {
      return (
        <div className={estilizarInlineFlex()}>
          <Button
            className={estilizarBotãoRetornar()}
            label="Retornar"
            onClick={retornarAdministrarPeçasMusicais}
          />
          <Button
            className={estilizarBotão()}
            label="Cadastrar"
            onClick={cadastrarPeçaMusical}
          />
        </div>
      );
    }
  }

  function títuloFormulário() {
    if (propostaConsultada) return "Alterar Peça Musical";
    else return "Cadastrar Peça Musical";
  }

  useEffect(() => {
    async function buscarEstilosPeçasMusicais() {
      try {
        const response = await serviçoBuscarPatrocíniosPeçasMusicais();
        if (response.data) setListaEstilos(response.data);
      } catch (error) {
        const erro = error.response.data.erro;
        if (erro) mostrarToast(referênciaToast, erro, "erro");
      }
    }
    buscarEstilosPeçasMusicais();
  }, []);

  return (
    <div className={estilizarFlex()}>
      <Toast
        ref={referênciaToast}
        onHide={retornarAdministrarPeçasMusicais}
        position="bottom-center"
      />
      <Card
        title={títuloFormulário()}
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Título*:
          </label>
          <InputText
            name="título"
            className={estilizarInputText(
              erros.título,
              400,
              usuárioLogado.cor_tema
            )}
            value={dados.título}
            onChange={alterarEstado}
          />
          <MostrarMensagemErro mensagem={erros.título} />
        </div>

        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Duração (minutos)*:
          </label>
          <InputNumber
            name="duração"
            className={estilizarInputNumber(
              erros.duração,
              usuárioLogado.cor_tema
            )}
            value={dados.duração}
            onValueChange={alterarEstado}
          />
          <MostrarMensagemErro mensagem={erros.duração} />
        </div>

        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Tom*:
          </label>
          <InputText
            name="tom"
            className={estilizarInputText(
              erros.tom,
              200,
              usuárioLogado.cor_tema
            )}
            value={dados.tom}
            onChange={alterarEstado}
          />
          <MostrarMensagemErro mensagem={erros.tom} />
        </div>

        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Estilo*:
          </label>
          <Dropdown
            name="estilo"
            className={estilizarDropdown(erros.estilo, usuárioLogado.cor_tema)}
            value={dados.estilo}
            options={opçõesEstilo}
            onChange={alterarEstado}
            placeholder="-- Selecione --"
          />
          <MostrarMensagemErro mensagem={erros.estilo} />
        </div>

        <Divider className={estilizarDivider()} />
        <BotõesAções />
      </Card>
    </div>
  );
}
