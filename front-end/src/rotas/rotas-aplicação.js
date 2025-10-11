import { Route, BrowserRouter, Routes } from "react-router-dom";
import RotasUsuárioLogado from "./rotas-usuário-logado";
import LogarUsuário from "../páginas/usuário/logar-usuário";
import CadastrarUsuário from "../páginas/usuário/cadastrar-usuário";
import PáginaInicial from "../páginas/usuário/página-inicial";
import CadastrarCriador from "../páginas/criador/cadastrar-criador";
import RecuperarAcesso from "../páginas/usuário/recuperar-acesso";
import CadastrarGerenteEmporio from "../páginas/gerente-emporio/cadastrar-gerente-emporio";
import { ProvedorCriador } from "../contextos/contexto-criador";
import { ProvedorGerenteEmporio } from "../contextos/contexto-gerente-emporio";
import RotasCriador from "./rotas-criador";
import RotasGerenteEmporio from "./rotas-gerente-emporio";
import GerenciarCervejas from "../páginas/criador/gerenciar-cervejas";
import CadastrarCerveja from "../páginas/criador/cadastrar-cerveja";
import EncomendasRecebidas from "../páginas/criador/encomendas-recebidas";
import CatalogoCervejas from "../páginas/gerente-emporio/catalogo-cervejas";
import FazerEncomenda from "../páginas/gerente-emporio/fazer-encomenda";
import MinhasEncomendas from "../páginas/gerente-emporio/minhas-encomendas";
import EditarEncomenda from "../páginas/gerente-emporio/editar-encomenda";
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
              <ProvedorCriador>
                <RotasCriador />
              </ProvedorCriador>
            }
          >
            <Route element={<CadastrarCriador />} path="cadastrar-criador" />
            <Route
              element={<GerenciarCervejas />}
              path="gerenciar-cervejas"
            />
            <Route
              element={<CadastrarCerveja />}
              path="cadastrar-cerveja"
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
