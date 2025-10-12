import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGerenteEmporio from "../../contextos/contexto-gerente-emporio";
import { serviçoCadastrarEncomenda } from "../../serviços/serviços-gerente-emporio";
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
  estilizarFlex,
  estilizarInlineFlex,
  estilizarInputNumber,
  estilizarLabel,
  estilizarCheckbox,
} from "../../utilitários/estilos";
import { desencriptarCpf } from "../../utilitários/máscaras";

export default function FazerEncomenda() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { cervejaArtesanalSelecionada } = useContext(ContextoGerenteEmporio);
  const [dados, setDados] = useState({
    quantidade: 1,
    valor_total: 0,
    nota_fiscal_emitida: false,
  });
  const [erros, setErros] = useState({});
  const navegar = useNavigate();

  function alterarEstado(event) {
    const chave = event.target.name || event.value;
    let valor = event.target.value;
    if (event.checked !== undefined) {
      valor = event.checked;
    }
    setDados({ ...dados, [chave]: valor });
  }

  function validarCampos() {
    const { quantidade, valor_total } = dados;
    let errosCamposObrigatórios = validarCamposObrigatórios({
      quantidade,
      valor_total,
    });
    setErros(errosCamposObrigatórios);
    return checarListaVazia(errosCamposObrigatórios);
  }

  function retornarCatalogo() {
    navegar("../catalogo-cervejas");
  }

  async function cadastrarEncomenda() {
    if (validarCampos()) {
      try {
        if (!cervejaArtesanalSelecionada) {
          mostrarToast(
            referênciaToast,
            "error",
            "Erro",
            "Nenhuma cerveja selecionada"
          );
          return;
        }
        const cpf = desencriptarCpf(usuárioLogado.cpf);
        const dadosAjustados = {
          ...dados,
          cerveja_artesanal_id: cervejaArtesanalSelecionada.id,
          cpf,
        };

        await serviçoCadastrarEncomenda(dadosAjustados);
        mostrarToast(
          referênciaToast,
          "success",
          "Sucesso",
          "Encomenda cadastrada com sucesso!"
        );
        navegar("../minhas-encomendas");
      } catch (error) {
        const mensagemErro =
          error.response?.data?.erro || "Erro ao cadastrar encomenda";
        mostrarToast(referênciaToast, "error", "Erro", mensagemErro);
      }
    }
  }

  return (
    <>
      <Toast ref={referênciaToast} position="bottom-center" />
      <Card
        title="Fazer Encomenda"
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        {cervejaArtesanalSelecionada ? (
          <>
            <div className={estilizarDivCampo()}>
              <label className={estilizarLabel(usuárioLogado.cor_tema)}>
                Cerveja Selecionada:
              </label>
              <p>{cervejaArtesanalSelecionada.nome}</p>
            </div>
            <br />
            <div className={estilizarDivCampo()}>
              <label className={estilizarLabel(usuárioLogado.cor_tema)}>
                Categoria:
              </label>
              <p>{cervejaArtesanalSelecionada.categoria}</p>
            </div>
            <br />
            <div className={estilizarDivCampo()}>
              <label className={estilizarLabel(usuárioLogado.cor_tema)}>
                Quantidade*:
              </label>
              <InputNumber
                name="quantidade"
                className={estilizarInputNumber(
                  erros.quantidade,
                  usuárioLogado.cor_tema
                )}
                value={dados.quantidade}
                onValueChange={alterarEstado}
                min={1}
              />
              <MostrarMensagemErro mensagem={erros.quantidade} />
            </div>
            <br />
            <div className={estilizarDivCampo()}>
              <label className={estilizarLabel(usuárioLogado.cor_tema)}>
                Valor Total*:
              </label>
              <InputNumber
                name="valor_total"
                className={estilizarInputNumber(
                  erros.valor_total,
                  usuárioLogado.cor_tema
                )}
                value={dados.valor_total}
                onValueChange={alterarEstado}
                mode="currency"
                currency="BRL"
                locale="pt-BR"
              />
              <MostrarMensagemErro mensagem={erros.valor_total} />
            </div>
            <br />
            <div className={estilizarInlineFlex("flex-start", "center")}>
              <Checkbox
                name="nota_fiscal_emitida"
                className={estilizarCheckbox(usuárioLogado.cor_tema)}
                checked={dados.nota_fiscal_emitida}
                onChange={alterarEstado}
              />
              <label
                style={{ marginLeft: "8px" }}
                className={estilizarLabel(usuárioLogado.cor_tema)}
              >
                Nota Fiscal Emitida
              </label>
            </div>
            <br />
            <div className={estilizarFlex("space-between", "center")}>
              <Button
                label="Cadastrar Encomenda"
                className={estilizarBotão(usuárioLogado.cor_tema)}
                onClick={cadastrarEncomenda}
              />
              <Button
                label="Retornar"
                icon="pi pi-arrow-left"
                className={estilizarBotãoRetornar(usuárioLogado.cor_tema)}
                onClick={retornarCatalogo}
              />
            </div>
          </>
        ) : (
          <div>
            <p>Nenhuma cerveja selecionada. Retorne ao catálogo.</p>
            <br />
            <Button
              label="Retornar ao Catálogo"
              icon="pi pi-arrow-left"
              className={estilizarBotãoRetornar(usuárioLogado.cor_tema)}
              onClick={retornarCatalogo}
            />
          </div>
        )}
      </Card>
    </>
  );
}
