import { Route, BrowserRouter, Routes } from "react-router-dom";
import RotasUsuárioLogado from "./rotas-usuário-logado";
import LogarUsuário from "../páginas/usuário/logar-usuário";
import CadastrarUsuário from "../páginas/usuário/cadastrar-usuário";
import PáginaInicial from "../páginas/usuário/página-inicial";
import CadastrarMaestro from "../páginas/maestro/cadastrar-maestro";
import RecuperarAcesso from "../páginas/usuário/recuperar-acesso";
import CadastrarPatrocinador from "../páginas/patrocinador/cadastrar-patrocinador";
import { ProvedorMaestro } from "../contextos/contexto-maestro";
import { ProvedorPatrocinador } from "../contextos/contexto-patrocinador";
import { ProvedorCriador } from "../contextos/contexto-criador";
import { ProvedorGerenteEmporio } from "../contextos/contexto-gerente-emporio";
import RotasMaestro from "./rotas-maestro";
import RotasPatrocinador from "./rotas-patrocinador";
import RotasCriador from "./rotas-criador";
import RotasGerenteEmporio from "./rotas-gerente-emporio";
import AdministrarPeçasMusicais from "../páginas/maestro/administrar-peças-musicais";
import CadastrarPeçaMusical from "../páginas/maestro/cadastrar-peça-musical";
import AdministrarPatrocínios from "../páginas/patrocinador/administrar-patrocínios";
import CadastrarPatrocínio from "../páginas/patrocinador/cadastrar-patrocínio";
import PesquisarPeçasMusicais from "../páginas/patrocinador/pesquisar-peças-musicais";
import ConsultarPeçaMusical from "../páginas/patrocinador/consultar-peça-musical";
import PesquisarPatrocínios from "../páginas/maestro/pesquisar-patrocínios";
import ConsultarPatrocínio from "../páginas/maestro/consultar-patrocínio";
import ConsultarPatrocinador from "../páginas/maestro/consultar-patrocinador";
import ConsultarMaestro from "../páginas/patrocinador/consultar-maestro";
import CadastrarCriador from "../páginas/criador/cadastrar-criador";
import CadastrarGerenteEmporio from "../páginas/gerente-emporio/cadastrar-gerente-emporio";
import GerenciarCervejas from "../páginas/criador/gerenciar-cervejas";
import CadastrarCervejaArtesanal from "../páginas/criador/cadastrar-cerveja-artesanal";
import CatalogoCervejas from "../páginas/gerente-emporio/catalogo-cervejas";
import FazerEncomenda from "../páginas/gerente-emporio/fazer-encomenda";
import MinhasEncomendas from "../páginas/gerente-emporio/minhas-encomendas";
import EditarEncomenda from "../páginas/gerente-emporio/editar-encomenda";
import EncomendasRecebidas from "../páginas/criador/encomendas-recebidas";
export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LogarUsuário />} path="/" />
        <Route element={<CadastrarUsuário />} path="criar-usuario" />
        <Route element={<RecuperarAcesso />} path="recuperar-acesso" />

        <Route element={<RotasUsuárioLogado />}>
          <Route element={<PáginaInicial />} path="pagina-inicial" />
          <Route element={<CadastrarUsuário />} path="atualizar-usuario" />

          <Route
            element={
              <ProvedorMaestro>
                <RotasMaestro />
              </ProvedorMaestro>
            }
          >
            <Route element={<CadastrarMaestro />} path="cadastrar-maestro" />
            <Route
              element={<AdministrarPeçasMusicais />}
              path="administrar-pecas-musicais"
            />
            <Route
              element={<CadastrarPeçaMusical />}
              path="cadastrar-peca-musical"
            />
            <Route
              element={<PesquisarPatrocínios />}
              path="pesquisar-patrocinios"
            />
            <Route
              element={<ConsultarPatrocínio />}
              path="consultar-patrocinio"
            />
            <Route
              element={<ConsultarPatrocinador />}
              path="consultar-patrocinador"
            />
          </Route>

          <Route
            element={
              <ProvedorPatrocinador>
                <RotasPatrocinador />
              </ProvedorPatrocinador>
            }
          >
            <Route
              element={<CadastrarPatrocinador />}
              path="cadastrar-patrocinador"
            />
            <Route
              element={<AdministrarPatrocínios />}
              path="administrar-patrocinios"
            />
            <Route
              element={<CadastrarPatrocínio />}
              path="cadastrar-patrocinio"
            />
            <Route
              element={<PesquisarPeçasMusicais />}
              path="pesquisar-pecas-musicais"
            />
            <Route
              element={<ConsultarPeçaMusical />}
              path="consultar-peca-musical"
            />
            <Route element={<ConsultarMaestro />} path="consultar-maestro" />
          </Route>

          <Route
            element={
              <ProvedorCriador>
                <RotasCriador />
              </ProvedorCriador>
            }
          >
            <Route
              element={<CadastrarCriador />}
              path="cadastrar-criador"
            />
            <Route
              element={<GerenciarCervejas />}
              path="gerenciar-cervejas"
            />
            <Route
              element={<CadastrarCervejaArtesanal />}
              path="cadastrar-cerveja-artesanal"
            />
            <Route
              element={<EncomendasRecebidas />}
              path="encomendas-recebidas"
            />
          </Route>

          <Route
            element={
              <ProvedorGerenteEmporio>
                <RotasGerenteEmporio />
              </ProvedorGerenteEmporio>
            }
          >
            <Route
              element={<CadastrarGerenteEmporio />}
              path="cadastrar-gerente-emporio"
            />
            <Route
              element={<CatalogoCervejas />}
              path="catalogo-cervejas"
            />
            <Route
              element={<FazerEncomenda />}
              path="fazer-encomenda"
            />
            <Route
              element={<MinhasEncomendas />}
              path="minhas-encomendas"
            />
            <Route
              element={<EditarEncomenda />}
              path="editar-encomenda"
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
