"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var verificar_token_1 = __importDefault(require("../middlewares/verificar-token"));
var servi_os_maestro_1 = __importDefault(require("src/servi\u00E7os/servi\u00E7os-maestro"));
var verificar_perfil_maestro_1 = __importDefault(require("../middlewares/verificar-perfil-maestro"));
var verificar_erro_conte_do_token_1 = __importDefault(require("../middlewares/verificar-erro-conte\u00FAdo-token"));
var RotasMaestro = (0, express_1.Router)();
exports.default = RotasMaestro;
RotasMaestro.post("/", servi_os_maestro_1.default.cadastrarMaestro);
RotasMaestro.get("/:cpf", verificar_token_1.default, verificar_perfil_maestro_1.default, servi_os_maestro_1.default.buscarMaestro);
RotasMaestro.patch("/", verificar_token_1.default, verificar_perfil_maestro_1.default, servi_os_maestro_1.default.atualizarMaestro);
RotasMaestro.post("/pecas-musicais", verificar_token_1.default, verificar_perfil_maestro_1.default, servi_os_maestro_1.default.cadastrarPeçaMusical);
RotasMaestro.patch("/pecas-musicais", verificar_token_1.default, verificar_perfil_maestro_1.default, servi_os_maestro_1.default.alterarPeçaMusical);
RotasMaestro.delete("/pecas-musicais/:id", verificar_token_1.default, verificar_perfil_maestro_1.default, servi_os_maestro_1.default.removerPeçaMusical);
RotasMaestro.get("/pecas-musicais/maestro/:cpf", verificar_token_1.default, verificar_perfil_maestro_1.default, verificar_erro_conte_do_token_1.default, servi_os_maestro_1.default.buscarPeçasMusicaisMaestro);
RotasMaestro.get("/pecas-musicais/patrocinios", verificar_token_1.default, verificar_perfil_maestro_1.default, servi_os_maestro_1.default.buscarPatrocíniosPeçasMusicais);
// Rota para buscar patrocínios de uma peça musical específica
RotasMaestro.get("/pecas-musicais/:id/patrocinios", servi_os_maestro_1.default.buscarPatrocíniosPeçaMusical);
//# sourceMappingURL=rotas-maestro.js.map