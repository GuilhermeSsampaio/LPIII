"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var verificar_token_1 = __importDefault(require("../middlewares/verificar-token"));
var servi_os_gerente_emporio_1 = __importDefault(require("src/servi\u00E7os/servi\u00E7os-gerente-emporio"));
var verificar_erro_conte_do_token_1 = __importDefault(require("../middlewares/verificar-erro-conte\u00FAdo-token"));
var RotasGerenteEmporio = (0, express_1.Router)();
exports.default = RotasGerenteEmporio;
RotasGerenteEmporio.post("/", servi_os_gerente_emporio_1.default.cadastrarGerenteEmporio);
RotasGerenteEmporio.get("/:cpf", verificar_token_1.default, servi_os_gerente_emporio_1.default.buscarGerenteEmporio);
RotasGerenteEmporio.patch("/", verificar_token_1.default, servi_os_gerente_emporio_1.default.atualizarGerenteEmporio);
RotasGerenteEmporio.post("/encomendas", verificar_token_1.default, servi_os_gerente_emporio_1.default.cadastrarEncomenda);
RotasGerenteEmporio.patch("/encomendas", verificar_token_1.default, servi_os_gerente_emporio_1.default.alterarEncomenda);
RotasGerenteEmporio.delete("/encomendas/:id", verificar_token_1.default, servi_os_gerente_emporio_1.default.removerEncomenda);
RotasGerenteEmporio.get("/encomendas/gerente/:cpf", verificar_token_1.default, verificar_erro_conte_do_token_1.default, servi_os_gerente_emporio_1.default.buscarEncomendasGerenteEmporio);
RotasGerenteEmporio.get("/encomendas/criador/:cpf", verificar_token_1.default, servi_os_gerente_emporio_1.default.buscarEncomendasRecebidasCriador);
//# sourceMappingURL=rotas-gerente-emporio.js.map