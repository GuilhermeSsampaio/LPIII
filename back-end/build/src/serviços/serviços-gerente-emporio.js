"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var md5_1 = __importDefault(require("md5"));
var typeorm_1 = require("typeorm");
var usu_rio_1 = __importStar(require("../entidades/usu\u00E1rio"));
var servi_os_usu_rio_1 = __importDefault(require("./servi\u00E7os-usu\u00E1rio"));
var gerente_emporio_1 = __importDefault(require("../entidades/gerente-emporio"));
var encomenda_1 = __importDefault(require("../entidades/encomenda"));
var cerveja_artesanal_1 = __importDefault(require("../entidades/cerveja-artesanal"));
var ServiçosGerenteEmporio = /** @class */ (function () {
    function ServiçosGerenteEmporio() {
    }
    ServiçosGerenteEmporio.cadastrarGerenteEmporio = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, usuário_info, telefone_1, localizacao_pais_1, nivel_experiencia_1, _b, usuário_1, token_1, entityManager, error_1;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = request.body, usuário_info = _a.usuário_info, telefone_1 = _a.telefone, localizacao_pais_1 = _a.localizacao_pais, nivel_experiencia_1 = _a.nivel_experiencia;
                        return [4 /*yield*/, servi_os_usu_rio_1.default.cadastrarUsuário(usuário_info)];
                    case 1:
                        _b = _c.sent(), usuário_1 = _b.usuário, token_1 = _b.token;
                        entityManager = (0, typeorm_1.getManager)();
                        return [4 /*yield*/, entityManager.transaction(function (transactionManager) { return __awaiter(_this, void 0, void 0, function () {
                                var gerenteEmporio;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, transactionManager.save(usuário_1)];
                                        case 1:
                                            _a.sent();
                                            gerenteEmporio = gerente_emporio_1.default.create({
                                                usuário: usuário_1,
                                                telefone: telefone_1,
                                                localizacao_pais: localizacao_pais_1,
                                                nivel_experiencia: nivel_experiencia_1,
                                            });
                                            return [4 /*yield*/, transactionManager.save(gerenteEmporio)];
                                        case 2:
                                            _a.sent();
                                            return [4 /*yield*/, transactionManager.update(usu_rio_1.default, usuário_1.cpf, {
                                                    status: usu_rio_1.Status.ATIVO,
                                                })];
                                        case 3:
                                            _a.sent();
                                            return [2 /*return*/, response.json({ status: usu_rio_1.Status.ATIVO, token: token_1 })];
                                    }
                                });
                            }); })];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _c.sent();
                        return [2 /*return*/, response.status(500).json({ erro: error_1 })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ServiçosGerenteEmporio.atualizarGerenteEmporio = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, cpf, telefone, localizacao_pais, nivel_experiencia, cpf_encriptado, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = request.body, cpf = _a.cpf, telefone = _a.telefone, localizacao_pais = _a.localizacao_pais, nivel_experiencia = _a.nivel_experiencia;
                        cpf_encriptado = (0, md5_1.default)(cpf);
                        return [4 /*yield*/, gerente_emporio_1.default.update({ usuário: { cpf: cpf_encriptado } }, { telefone: telefone, localizacao_pais: localizacao_pais, nivel_experiencia: nivel_experiencia })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, response.json()];
                    case 2:
                        error_2 = _b.sent();
                        return [2 /*return*/, response.status(500).json({ erro: "Erro BD : atualizarGerenteEmporio" })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiçosGerenteEmporio.buscarGerenteEmporio = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var cpf_encriptado, gerenteEmporio, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        cpf_encriptado = (0, md5_1.default)(request.params.cpf);
                        return [4 /*yield*/, gerente_emporio_1.default.findOne({
                                where: { usuário: cpf_encriptado },
                                relations: ["usuário"],
                            })];
                    case 1:
                        gerenteEmporio = _a.sent();
                        if (!gerenteEmporio)
                            return [2 /*return*/, response.status(404).json({ erro: "Gerente de Empório não encontrado." })];
                        return [2 /*return*/, response.json({
                                nome: gerenteEmporio.usuário.nome,
                                email: gerenteEmporio.usuário.email,
                                telefone: gerenteEmporio.telefone,
                                localizacao_pais: gerenteEmporio.localizacao_pais,
                                nivel_experiencia: gerenteEmporio.nivel_experiencia,
                            })];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, response.status(500).json({ erro: "Erro BD : buscarGerenteEmporio" })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiçosGerenteEmporio.cadastrarEncomenda = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, quantidade, valor_total, nota_fiscal_emitida, cerveja_artesanal_id, cpf, cpf_encriptado, gerenteEmporio, cervejaArtesanal, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = request.body, quantidade = _a.quantidade, valor_total = _a.valor_total, nota_fiscal_emitida = _a.nota_fiscal_emitida, cerveja_artesanal_id = _a.cerveja_artesanal_id, cpf = _a.cpf;
                        cpf_encriptado = (0, md5_1.default)(cpf);
                        return [4 /*yield*/, gerente_emporio_1.default.findOne({
                                where: { usuário: cpf_encriptado },
                                relations: ["usuário"],
                            })];
                    case 1:
                        gerenteEmporio = _b.sent();
                        return [4 /*yield*/, cerveja_artesanal_1.default.findOne(cerveja_artesanal_id)];
                    case 2:
                        cervejaArtesanal = _b.sent();
                        return [4 /*yield*/, encomenda_1.default.create({
                                quantidade: quantidade,
                                valor_total: valor_total,
                                nota_fiscal_emitida: nota_fiscal_emitida,
                                cerveja_artesanal: cervejaArtesanal,
                                gerente_emporio: gerenteEmporio,
                            }).save()];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, response.json()];
                    case 4:
                        error_4 = _b.sent();
                        return [2 /*return*/, response
                                .status(500)
                                .json({ erro: "Erro BD : cadastrarEncomenda" })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ServiçosGerenteEmporio.alterarEncomenda = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, quantidade, valor_total, nota_fiscal_emitida, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = request.body, id = _a.id, quantidade = _a.quantidade, valor_total = _a.valor_total, nota_fiscal_emitida = _a.nota_fiscal_emitida;
                        return [4 /*yield*/, encomenda_1.default.update(id, {
                                quantidade: quantidade,
                                valor_total: valor_total,
                                nota_fiscal_emitida: nota_fiscal_emitida,
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, response.json()];
                    case 2:
                        error_5 = _b.sent();
                        return [2 /*return*/, response
                                .status(500)
                                .json({ erro: "Erro BD : alterarEncomenda", error: error_5 })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiçosGerenteEmporio.removerEncomenda = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id_encomenda, encomenda, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id_encomenda = request.params.id;
                        return [4 /*yield*/, encomenda_1.default.findOne(id_encomenda)];
                    case 1:
                        encomenda = _a.sent();
                        return [4 /*yield*/, encomenda_1.default.remove(encomenda)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.json()];
                    case 3:
                        error_6 = _a.sent();
                        return [2 /*return*/, response
                                .status(500)
                                .json({ erro: "Erro BD : removerEncomenda" })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ServiçosGerenteEmporio.buscarEncomendasGerenteEmporio = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var cpf_encriptado, encomendas, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        cpf_encriptado = (0, md5_1.default)(request.params.cpf);
                        return [4 /*yield*/, encomenda_1.default.find({
                                where: { gerente_emporio: { usuário: cpf_encriptado } },
                                relations: ["gerente_emporio", "gerente_emporio.usuário", "cerveja_artesanal", "cerveja_artesanal.criador", "cerveja_artesanal.criador.usuário"],
                            })];
                    case 1:
                        encomendas = _a.sent();
                        return [2 /*return*/, response.json(encomendas)];
                    case 2:
                        error_7 = _a.sent();
                        return [2 /*return*/, response
                                .status(500)
                                .json({ erro: "Erro BD : buscarEncomendasGerenteEmporio" })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiçosGerenteEmporio.buscarEncomendasRecebidasCriador = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var cpf_encriptado, encomendas, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        cpf_encriptado = (0, md5_1.default)(request.params.cpf);
                        return [4 /*yield*/, encomenda_1.default.find({
                                where: { cerveja_artesanal: { criador: { usuário: cpf_encriptado } } },
                                relations: ["gerente_emporio", "gerente_emporio.usuário", "cerveja_artesanal", "cerveja_artesanal.criador", "cerveja_artesanal.criador.usuário"],
                            })];
                    case 1:
                        encomendas = _a.sent();
                        return [2 /*return*/, response.json(encomendas)];
                    case 2:
                        error_8 = _a.sent();
                        return [2 /*return*/, response
                                .status(500)
                                .json({ erro: "Erro BD : buscarEncomendasRecebidasCriador" })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ServiçosGerenteEmporio;
}());
exports.default = ServiçosGerenteEmporio;
//# sourceMappingURL=servi%C3%A7os-gerente-emporio.js.map