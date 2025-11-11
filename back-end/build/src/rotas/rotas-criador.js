"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var verificar_token_1 = __importDefault(require("../middlewares/verificar-token"));
var servi_os_criador_1 = __importDefault(require("src/servi\u00E7os/servi\u00E7os-criador"));
var verificar_erro_conte_do_token_1 = __importDefault(require("../middlewares/verificar-erro-conte\u00FAdo-token"));
var RotasCriador = (0, express_1.Router)();
exports.default = RotasCriador;
RotasCriador.post("/", servi_os_criador_1.default.cadastrarCriador);
RotasCriador.get("/:cpf", verificar_token_1.default, servi_os_criador_1.default.buscarCriador);
RotasCriador.patch("/", verificar_token_1.default, servi_os_criador_1.default.atualizarCriador);
RotasCriador.post("/cervejas-artesanais", verificar_token_1.default, servi_os_criador_1.default.cadastrarCervejaArtesanal);
RotasCriador.patch("/cervejas-artesanais", verificar_token_1.default, servi_os_criador_1.default.alterarCervejaArtesanal);
RotasCriador.delete("/cervejas-artesanais/:id", verificar_token_1.default, servi_os_criador_1.default.removerCervejaArtesanal);
RotasCriador.get("/cervejas-artesanais/criador/:cpf", verificar_token_1.default, verificar_erro_conte_do_token_1.default, servi_os_criador_1.default.buscarCervejasArtesanaisCriador);
RotasCriador.get("/cervejas-artesanais/todas", verificar_token_1.default, servi_os_criador_1.default.buscarTodasCervejasArtesanais);
//# sourceMappingURL=rotas-criador.js.map