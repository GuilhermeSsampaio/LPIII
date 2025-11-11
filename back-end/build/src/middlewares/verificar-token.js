"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = require("jsonwebtoken");
dotenv_1.default.config();
var SENHA_JWT = process.env.SENHA_JWT;
function verificarToken(request, response, next) {
    var header = request.headers.authorization;
    if (!header)
        return response.status(401).json({ erro: "Token nao informado." });
    var token = header.split(" ")[1];
    try {
        var _a = (0, jsonwebtoken_1.verify)(token, SENHA_JWT), perfil = _a.perfil, email = _a.email;
        request.perfil = perfil;
        request.email_token = email;
        return next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            return response
                .status(401)
                .json({ erro: "Token expirado, faça login novamente." });
        }
        return response.status(401).json({ erro: "Token invalido." });
    }
}
exports.default = verificarToken;
//# sourceMappingURL=verificar-token.js.map