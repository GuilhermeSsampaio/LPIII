"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var servi_os_usu_rio_1 = __importDefault(require("src/servi\u00E7os/servi\u00E7os-usu\u00E1rio"));
var verificar_token_1 = __importDefault(require("../middlewares/verificar-token"));
var verificar_erro_conte_do_token_1 = __importDefault(require("../middlewares/verificar-erro-conte\u00FAdo-token"));
var RotasUsuário = (0, express_1.Router)();
exports.default = RotasUsuário;
RotasUsuário.post("/login", servi_os_usu_rio_1.default.logarUsuário);
RotasUsuário.post("/verificar-cpf/:cpf", servi_os_usu_rio_1.default.verificarCpfExistente);
RotasUsuário.patch("/alterar-usuario", verificar_token_1.default, servi_os_usu_rio_1.default.alterarUsuário);
RotasUsuário.delete("/:cpf", verificar_token_1.default, verificar_erro_conte_do_token_1.default, servi_os_usu_rio_1.default.removerUsuário);
RotasUsuário.get("/questao/:cpf", servi_os_usu_rio_1.default.buscarQuestãoSegurança);
RotasUsuário.post("/verificar-resposta", servi_os_usu_rio_1.default.verificarRespostaCorreta);
//# sourceMappingURL=rotas-usu%C3%A1rio.js.map