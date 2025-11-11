import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGerenteEmporio from "../../contextos/contexto-gerente-emporio";
import {
  serviçoCadastrarEncomenda,
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
  estilizarInputNumber,
  estilizarLabel,
  estilizarCheckbox,
} from "../../utilitários/estilos";

export default function FazerEncomenda() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { cervejaArtesanalSelecionada } = useContext(ContextoGerenteEmporio);
  const [dados, setDados] = useState({
    quantidade: "",
    valor_total: "",
    nota_fiscal_emitida: false,
  });
  const [erros, setErros] = useState({});
  const navegar = useNavigate();

  function alterarEstado(event) {
    const chave = event.target.name || event.value;
    let valor = event.target.value || event.checked;
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
        const dadosAjustados = {
          ...dados,
          cpf: usuárioLogado.cpf,
          cerveja_artesanal_id: cervejaArtesanalSelecionada.id,
        };

        await serviçoCadastrarEncomenda(dadosAjustados);
        mostrarToast(
          referênciaToast,
          "Encomenda realizada com sucesso!",
          "sucesso"
        );
      } catch (error) {
        mostrarToast(referênciaToast, error.response.data.erro, "erro");
      }
    }
  }

  if (!cervejaArtesanalSelecionada) {
    return (
      <div className={estilizarFlex()}>
        <Card
          title="Fazer Encomenda"
          className={estilizarCard(usuárioLogado.cor_tema)}
        >
          <p>Selecione uma cerveja artesanal no catálogo primeiro.</p>
          <Divider className={estilizarDivider(usuárioLogado.cor_tema)} />
          <Button
            className={estilizarBotãoRetornar()}
            label="Ir para Catálogo"
            onClick={retornarCatalogo}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className={estilizarFlex()}>
      <Toast
        ref={referênciaToast}
        onHide={retornarCatalogo}
        position="bottom-center"
      />
      <Card
        title={`Fazer Encomenda - ${cervejaArtesanalSelecionada.nome}`}
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Cerveja: {cervejaArtesanalSelecionada.nome}
          </label>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Categoria: {cervejaArtesanalSelecionada.categoria}
          </label>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Teor Alcoólico: {cervejaArtesanalSelecionada.teor_alcoolico}%
          </label>
        </div>
        <br />
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Quantidade*:
          </label>
          <InputNumber
            name="quantidade"
            size={5}
            value={dados.quantidade}
            onValueChange={alterarEstado}
            mode="decimal"
            useGrouping={false}
            inputClassName={estilizarInputNumber(
              erros.quantidade,
              usuárioLogado.cor_tema
            )}
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
            size={10}
            value={dados.valor_total}
            onValueChange={alterarEstado}
            mode="decimal"
            minFractionDigits={2}
            maxFractionDigits={2}
            inputClassName={estilizarInputNumber(
              erros.valor_total,
              usuárioLogado.cor_tema
            )}
          />
          <MostrarMensagemErro mensagem={erros.valor_total} />
        </div>
        <br />
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Nota Fiscal Emitida:
          </label>
          <Checkbox
            name="nota_fiscal_emitida"
            className={estilizarCheckbox(usuárioLogado.cor_tema)}
            checked={dados.nota_fiscal_emitida}
            onChange={alterarEstado}
          />
        </div>
        <Divider className={estilizarDivider(usuárioLogado.cor_tema)} />
        <div className={estilizarInlineFlex()}>
          <Button
            className={estilizarBotãoRetornar()}
            label="Retornar"
            onClick={retornarCatalogo}
          />
          <Button
            className={estilizarBotão()}
            label="Fazer Encomenda"
            onClick={cadastrarEncomenda}
          />
        </div>
      </Card>
    </div>
  );
}
