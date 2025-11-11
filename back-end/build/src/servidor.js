"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var rotas_usu_rio_1 = __importDefault(require("./rotas/rotas-usu\u00E1rio"));
var rotas_maestro_1 = __importDefault(require("./rotas/rotas-maestro"));
var rotas_patrocinador_1 = __importDefault(require("./rotas/rotas-patrocinador"));
var rotas_criador_1 = __importDefault(require("./rotas/rotas-criador"));
var rotas_gerente_emporio_1 = __importDefault(require("./rotas/rotas-gerente-emporio"));
var app = (0, express_1.default)();
var PORT = process.env.PORT;
var CORS_ORIGIN = process.env.CORS_ORIGIN;
app.use((0, cors_1.default)({ origin: CORS_ORIGIN }));
app.use(express_1.default.json());
app.use("/usuarios", rotas_usu_rio_1.default);
app.use("/maestros", rotas_maestro_1.default);
app.use("/patrocinadores", rotas_patrocinador_1.default);
app.use("/criadores", rotas_criador_1.default);
app.use("/gerentes-emporio", rotas_gerente_emporio_1.default);
app.listen(PORT || 3333);
var conexão = (0, typeorm_1.createConnection)();
exports.default = conexão;
//# sourceMappingURL=servidor.js.map