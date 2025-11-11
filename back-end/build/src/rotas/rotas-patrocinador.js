"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var verificar_token_1 = __importDefault(require("../middlewares/verificar-token"));
var verificar_perfil_patrocinador_1 = __importDefault(require("../middlewares/verificar-perfil-patrocinador"));
var servi_os_patrocinador_1 = __importDefault(require("../servi\u00E7os/servi\u00E7os-patrocinador"));
var verificar_erro_conte_do_token_1 = __importDefault(require("../middlewares/verificar-erro-conte\u00FAdo-token"));
var RotasPatrocinador = (0, express_1.Router)();
exports.default = RotasPatrocinador;
RotasPatrocinador.post("/", servi_os_patrocinador_1.default.cadastrarPatrocinador);
RotasPatrocinador.patch("/", verificar_token_1.default, verificar_perfil_patrocinador_1.default, servi_os_patrocinador_1.default.atualizarPatrocinador);
RotasPatrocinador.get("/:cpf", verificar_token_1.default, verificar_perfil_patrocinador_1.default, servi_os_patrocinador_1.default.buscarPatrocinador);
RotasPatrocinador.post("/patrocinios/", verificar_token_1.default, verificar_perfil_patrocinador_1.default, servi_os_patrocinador_1.default.cadastrarPatrocínio);
RotasPatrocinador.delete("/patrocinios/:id", verificar_token_1.default, verificar_perfil_patrocinador_1.default, servi_os_patrocinador_1.default.removerPatrocínio);
RotasPatrocinador.get("/patrocinios/patrocinador/:cpf", verificar_token_1.default, verificar_perfil_patrocinador_1.default, verificar_erro_conte_do_token_1.default, servi_os_patrocinador_1.default.buscarPatrocíniosPatrocinador);
RotasPatrocinador.get("/patrocinios/pecas-musicais/", verificar_token_1.default, verificar_perfil_patrocinador_1.default, servi_os_patrocinador_1.default.buscarPeçasMusicais);
//# sourceMappingURL=rotas-patrocinador.js.map