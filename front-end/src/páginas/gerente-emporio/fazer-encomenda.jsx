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
import { servicoCadastrarEncomenda } from "../../serviços/servicos-gerente-emporio";
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
  estilizarInputNumber,
  estilizarLabel,
  estilizarCheckbox,
} from "../../utilitários/estilos";

export default function FazerEncomenda() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { cervejaSelecionada } = useContext(ContextoGerenteEmporio);
  const [dados, setDados] = useState({
    quantidade: "",
    valor_total: "",
    nota_fiscal_emitida: false,
  });
  const [erros, setErros] = useState({});
  const navegar = useNavigate();

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
    if (!cervejaSelecionada) {
      mostrarToast(referênciaToast, "Selecione uma cerveja no catálogo", "erro");
      return;
    }

    if (validarCampos()) {
      try {
        const dadosAjustados = {
          ...dados,
          cerveja_artesanal_id: cervejaSelecionada.id,
          usuario_id: usuárioLogado.id,
        };

        await servicoCadastrarEncomenda(dadosAjustados);
        mostrarToast(
          referênciaToast,
          "Encomenda cadastrada com sucesso!",
          "sucesso"
        );
        setTimeout(() => navegar("../minhas-encomendas"), 1500);
      } catch (error) {
        mostrarToast(referênciaToast, error.response?.data?.erro || "Erro ao cadastrar", "erro");
      }
    }
  }

  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} />
      <Card
        title="Fazer Encomenda"
        className={estilizarCard(usuárioLogado?.cor_tema)}
      >
        {cervejaSelecionada && (
          <div className={estilizarDivCampo()}>
            <label className={estilizarLabel()}>
              Cerveja Selecionada: <strong>{cervejaSelecionada.nome}</strong>
            </label>
          </div>
        )}

        <div className={estilizarDivCampo()}>
          <label htmlFor="quantidade" className={estilizarLabel()}>
            Quantidade *
          </label>
          <InputNumber
            id="quantidade"
            name="quantidade"
            value={dados.quantidade}
            onValueChange={(e) => setDados({ ...dados, quantidade: e.value })}
            className={estilizarInputNumber(erros.quantidade)}
            useGrouping={false}
          />
        </div>

        <div className={estilizarDivCampo()}>
          <label htmlFor="valor_total" className={estilizarLabel()}>
            Valor Total *
          </label>
          <InputNumber
            id="valor_total"
            name="valor_total"
            value={dados.valor_total}
            onValueChange={(e) => setDados({ ...dados, valor_total: e.value })}
            className={estilizarInputNumber(erros.valor_total)}
            mode="currency"
            currency="BRL"
            locale="pt-BR"
          />
        </div>

        <div className={estilizarDivCampo()}>
          <label htmlFor="nota_fiscal_emitida" className={estilizarLabel()}>
            Nota Fiscal Emitida
          </label>
          <Checkbox
            inputId="nota_fiscal_emitida"
            name="nota_fiscal_emitida"
            checked={dados.nota_fiscal_emitida}
            onChange={(e) => setDados({ ...dados, nota_fiscal_emitida: e.checked })}
            className={estilizarCheckbox(usuárioLogado?.cor_tema)}
          />
        </div>

        <Divider className={estilizarDivider()} />
        <Button
          className={estilizarBotãoRetornar()}
          label="Retornar"
          onClick={retornarCatalogo}
        />
        <Button
          className={estilizarBotão()}
          label="Cadastrar"
          onClick={cadastrarEncomenda}
        />
      </Card>
    </div>
  );
}
