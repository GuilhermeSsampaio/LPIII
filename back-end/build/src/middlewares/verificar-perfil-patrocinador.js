"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var usu_rio_1 = require("../entidades/usu\u00E1rio");
function verificarPerfilPatrocinador(request, response, next) {
    if (request.perfil === usu_rio_1.Perfil.PATROCINADOR)
        return next();
    else
        return response.status(401).json({ erro: "Acesso não autorizado." });
}
exports.default = verificarPerfilPatrocinador;
//# sourceMappingURL=verificar-perfil-patrocinador.js.map