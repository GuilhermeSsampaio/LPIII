import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoPatrocinador from "../../contextos/contexto-patrocinador";
import {
  estilizarBotãoRetornar,
  estilizarCard,
  estilizarCheckbox,
  estilizarDivCampo,
  estilizarDivider,
  estilizarFlex,
  estilizarInlineFlex,
  estilizarInputText,
  estilizarLabel,
} from "../../utilitários/estilos";
export default function ConsultarPeçaMusical() {
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { peçaMusicalConsultada, peçaMusicalInteresse } =
    useContext(ContextoPatrocinador);
  const dados = {
    nome_maestro:
      peçaMusicalConsultada?.maestro?.usuário?.nome ||
      peçaMusicalInteresse?.maestro?.usuário?.nome,
    título: peçaMusicalConsultada?.título || peçaMusicalInteresse?.título,
    categoria:
      peçaMusicalConsultada?.categoria || peçaMusicalInteresse?.categoria,
    área_atuação:
      peçaMusicalConsultada?.área_atuação || peçaMusicalInteresse?.área_atuação,
    data_início:
      peçaMusicalConsultada?.data_início || peçaMusicalInteresse?.data_início,
    descrição:
      peçaMusicalConsultada?.descrição || peçaMusicalInteresse?.descrição,
    concorrendo_bolsa:
      peçaMusicalConsultada?.concorrendo_bolsa ||
      peçaMusicalInteresse?.concorrendo_bolsa,
    resultado:
      peçaMusicalConsultada?.resultado || peçaMusicalInteresse?.resultado,
  };
  const navegar = useNavigate();
  function retornar() {
    if (peçaMusicalConsultada) navegar("../pesquisar-peçasMusicais");
    else if (peçaMusicalInteresse) navegar("../cadastrar-interesse");
  }
  return (
    <div className={estilizarFlex()}>
      <Card
        title="Consultar PeçaMusical"
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Maestro*:
          </label>
          <InputText
            name="nome_maestro"
            className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.nome_maestro}
            disabled
          />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Título*:
          </label>
          <InputText
            name="título"
            className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.título}
            disabled
          />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Categoria*:
          </label>
          <InputText
            name="categoria"
            className={estilizarInputText(null, 200, usuárioLogado.cor_tema)}
            value={dados.categoria}
            disabled
          />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Área de Atuação*:
          </label>
          <InputText
            name="área_atuação"
            className={estilizarInputText(null, 350, usuárioLogado.cor_tema)}
            value={dados.área_atuação}
            disabled
          />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Data de Início*:
          </label>
          <InputText
            name="data_início"
            type="date"
            value={dados.data_início}
            className={estilizarInputText(null, usuárioLogado.cor_tema)}
            disabled
          />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Descrição*:
          </label>
          <InputTextarea
            name="descrição"
            value={dados.descrição}
            className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            autoResize
            disabled
          />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Concorrendo à Bolsa*:
          </label>
          <Checkbox
            name="concorrendo_bolsa"
            checked={dados.concorrendo_bolsa}
            className={estilizarCheckbox(null)}
            autoResize
            disabled
          />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Resultado*:
          </label>
          <InputText
            name="resultado"
            className={estilizarInputText(null, 100, usuárioLogado.cor_tema)}
            value={dados.resultado}
            autoResize
            disabled
          />
        </div>
        <Divider className={estilizarDivider()} />
        <div className={estilizarInlineFlex()}>
          <Button
            className={estilizarBotãoRetornar()}
            label="Retornar"
            onClick={retornar}
          />
        </div>
      </Card>
    </div>
  );
}
