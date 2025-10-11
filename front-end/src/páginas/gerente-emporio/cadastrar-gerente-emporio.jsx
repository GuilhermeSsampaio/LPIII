import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import {
  servicoCadastrarGerenteEmporio,
  servicoBuscarGerenteEmporio,
  servicoAtualizarGerenteEmporio,
} from "../../serviços/servicos-gerente-emporio";
import mostrarToast from "../../utilitários/mostrar-toast";
import {
  checarListaVazia,
  validarCamposObrigatórios,
} from "../../utilitários/validações";
import {
  estilizarBotão,
  estilizarCard,
  estilizarDivCampo,
  estilizarDivider,
  estilizarFlex,
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
        const response = await servicoCadastrarGerenteEmporio({
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
          "Gerente de Empório cadastrado com sucesso!",
          "sucesso"
        );
        redirecionar();
      } catch (error) {
        mostrarToast(referênciaToast, error.response?.data?.erro || "Erro ao cadastrar", "erro");
      }
    }
  }

  async function atualizarGerenteEmporio() {
    if (validarCampos()) {
      try {
        await servicoAtualizarGerenteEmporio({
          ...dados,
          id: usuárioLogado.id,
        });
        mostrarToast(
          referênciaToast,
          "Gerente de Empório atualizado com sucesso!",
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
    if (usuárioLogado?.cadastrado) atualizarGerenteEmporio();
    else cadastrarGerenteEmporio();
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
    async function buscarDadosGerenteEmporio() {
      try {
        const response = await servicoBuscarGerenteEmporio(usuárioLogado.id);
        if (!desmontado && response.data) {
          setDados({
            telefone: response.data.telefone || "",
            localizacao_pais: response.data.localizacao_pais || "",
            nivel_experiencia: response.data.nivel_experiencia || "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (usuárioLogado?.cadastrado) buscarDadosGerenteEmporio();
    return () => (desmontado = true);
  }, [usuárioLogado]);

  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} />
      <Card title={títuloFormulário()} className={estilizarCard(usuárioLogado?.cor_tema)}>
        <div className={estilizarDivCampo()}>
          <label htmlFor="telefone" className={estilizarLabel()}>
            Telefone
          </label>
          <InputText
            id="telefone"
            name="telefone"
            value={dados.telefone}
            onChange={alterarEstado}
            className={estilizarInputText(erros.telefone)}
          />
        </div>

        <div className={estilizarDivCampo()}>
          <label htmlFor="localizacao_pais" className={estilizarLabel()}>
            País de Localização
          </label>
          <InputText
            id="localizacao_pais"
            name="localizacao_pais"
            value={dados.localizacao_pais}
            onChange={alterarEstado}
            className={estilizarInputText(erros.localizacao_pais)}
          />
        </div>

        <div className={estilizarDivCampo()}>
          <label htmlFor="nivel_experiencia" className={estilizarLabel()}>
            Nível de Experiência
          </label>
          <InputText
            id="nivel_experiencia"
            name="nivel_experiencia"
            value={dados.nivel_experiencia}
            onChange={alterarEstado}
            className={estilizarInputText(erros.nivel_experiencia)}
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
