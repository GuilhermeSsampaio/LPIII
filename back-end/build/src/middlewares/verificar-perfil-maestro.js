"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var usu_rio_1 = require("../entidades/usu\u00E1rio");
function verificarPerfilMaestro(request, response, next) {
    if (request.perfil === usu_rio_1.Perfil.MAESTRO)
        return next();
    else
        return response.status(401).json({ erro: "Acesso não autorizado." });
}
exports.default = verificarPerfilMaestro;
//# sourceMappingURL=verificar-perfil-maestro.js.map