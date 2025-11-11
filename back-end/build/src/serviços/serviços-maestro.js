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
var maestro_1 = __importDefault(require("../entidades/maestro"));
var pe_a_musical_1 = __importDefault(require("../entidades/pe\u00E7a-musical"));
var patroc_nio_1 = __importDefault(require("src/entidades/patroc\u00EDnio"));
var ServiçosMaestro = /** @class */ (function () {
    function ServiçosMaestro() {
    }
    ServiçosMaestro.cadastrarMaestro = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, usuário_info, estilo_1, anos_experiência_1, nacionalidade_1, _b, usuário_1, token_1, entityManager, error_1;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = request.body, usuário_info = _a.usuário_info, estilo_1 = _a.estilo, anos_experiência_1 = _a.anos_experiência, nacionalidade_1 = _a.nacionalidade;
                        return [4 /*yield*/, servi_os_usu_rio_1.default.cadastrarUsuário(usuário_info)];
                    case 1:
                        _b = _c.sent(), usuário_1 = _b.usuário, token_1 = _b.token;
                        entityManager = (0, typeorm_1.getManager)();
                        return [4 /*yield*/, entityManager.transaction(function (transactionManager) { return __awaiter(_this, void 0, void 0, function () {
                                var maestro;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, transactionManager.save(usuário_1)];
                                        case 1:
                                            _a.sent();
                                            maestro = maestro_1.default.create({
                                                usuário: usuário_1,
                                                estilo: estilo_1,
                                                anos_experiência: anos_experiência_1,
                                                nacionalidade: nacionalidade_1,
                                            });
                                            return [4 /*yield*/, transactionManager.save(maestro)];
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
    ServiçosMaestro.atualizarMaestro = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, cpf, estilo, anos_experiência, nacionalidade, cpf_encriptado, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = request.body, cpf = _a.cpf, estilo = _a.estilo, anos_experiência = _a.anos_experiência, nacionalidade = _a.nacionalidade;
                        cpf_encriptado = (0, md5_1.default)(cpf);
                        return [4 /*yield*/, maestro_1.default.update({ usuário: { cpf: cpf_encriptado } }, { estilo: estilo, anos_experiência: anos_experiência, nacionalidade: nacionalidade })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, response.json()];
                    case 2:
                        error_2 = _b.sent();
                        return [2 /*return*/, response.status(500).json({ erro: "Erro BD : atualizarMaestro" })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiçosMaestro.buscarMaestro = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var cpf_encriptado, maestro, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        cpf_encriptado = (0, md5_1.default)(request.params.cpf);
                        return [4 /*yield*/, maestro_1.default.findOne({
                                where: { usuário: cpf_encriptado },
                                relations: ["usuário"],
                            })];
                    case 1:
                        maestro = _a.sent();
                        if (!maestro)
                            return [2 /*return*/, response.status(404).json({ erro: "Maestro não encontrado." })];
                        return [2 /*return*/, response.json({
                                nome: maestro.usuário.nome,
                                email: maestro.usuário.email,
                                estilo: maestro.estilo,
                                anos_experiência: maestro.anos_experiência,
                                nacionalidade: maestro.nacionalidade,
                            })];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, response.status(500).json({ erro: "Erro BD : buscarMaestro" })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiçosMaestro.cadastrarPeçaMusical = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, título, duração, tom, gênero, cpf, internacional, cpf_encriptado, maestro, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = request.body, título = _a.título, duração = _a.duração, tom = _a.tom, gênero = _a.gênero, cpf = _a.cpf, internacional = _a.internacional;
                        cpf_encriptado = (0, md5_1.default)(cpf);
                        return [4 /*yield*/, maestro_1.default.findOne({
                                where: { usuário: cpf_encriptado },
                                relations: ["usuário"],
                            })];
                    case 1:
                        maestro = _b.sent();
                        return [4 /*yield*/, pe_a_musical_1.default.create({
                                título: título,
                                duração: duração,
                                tom: tom,
                                gênero: gênero,
                                maestro: maestro,
                                internacional: internacional,
                            }).save()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, response.json()];
                    case 3:
                        error_4 = _b.sent();
                        return [2 /*return*/, response
                                .status(500)
                                .json({ erro: "Erro BD : cadastrarPeçaMusical" })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ServiçosMaestro.alterarPeçaMusical = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, título, duração, tom, gênero, internacional, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = request.body, id = _a.id, título = _a.título, duração = _a.duração, tom = _a.tom, gênero = _a.gênero, internacional = _a.internacional;
                        return [4 /*yield*/, pe_a_musical_1.default.update(id, {
                                título: título,
                                duração: duração,
                                tom: tom,
                                gênero: gênero,
                                internacional: internacional,
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, response.json()];
                    case 2:
                        error_5 = _b.sent();
                        return [2 /*return*/, response
                                .status(500)
                                .json({ erro: "Erro BD : alterarPeçaMusical", error: error_5 })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiçosMaestro.removerPeçaMusical = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id_peça, peçaMusical, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id_peça = request.params.id;
                        return [4 /*yield*/, pe_a_musical_1.default.findOne(id_peça)];
                    case 1:
                        peçaMusical = _a.sent();
                        return [4 /*yield*/, pe_a_musical_1.default.remove(peçaMusical)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.json()];
                    case 3:
                        error_6 = _a.sent();
                        return [2 /*return*/, response
                                .status(500)
                                .json({ erro: "Erro BD : removerPeçaMusical" })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ServiçosMaestro.buscarPeçasMusicaisMaestro = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var cpf_encriptado, peçasMusicais, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        cpf_encriptado = (0, md5_1.default)(request.params.cpf);
                        return [4 /*yield*/, pe_a_musical_1.default.find({
                                where: { maestro: { usuário: cpf_encriptado } },
                                relations: ["maestro", "maestro.usuário"],
                            })];
                    case 1:
                        peçasMusicais = _a.sent();
                        return [2 /*return*/, response.json(peçasMusicais)];
                    case 2:
                        error_7 = _a.sent();
                        return [2 /*return*/, response
                                .status(500)
                                .json({ erro: "Erro BD : buscarPeçasMusicaisMaestro" })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiçosMaestro.filtrarEstilosEliminandoRepetição = function (peçasMusicais) {
        var estilos;
        estilos = peçasMusicais
            .filter(function (peçaMusical, índice, peças_antes_filtrar) {
            return peças_antes_filtrar.findIndex(function (peça_anterior) { return peça_anterior.gênero === peçaMusical.gênero; }) === índice;
        })
            .map(function (peçaMusical) { return ({
            label: peçaMusical.gênero,
            value: peçaMusical.gênero,
        }); });
        return estilos;
    };
    ServiçosMaestro.buscarPatrocíniosPeçasMusicais = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var peçasMusicais, estilos, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, pe_a_musical_1.default.find()];
                    case 1:
                        peçasMusicais = _a.sent();
                        estilos = ServiçosMaestro.filtrarEstilosEliminandoRepetição(peçasMusicais);
                        return [2 /*return*/, response.json(estilos.sort())];
                    case 2:
                        error_8 = _a.sent();
                        return [2 /*return*/, response
                                .status(500)
                                .json({ erro: "Erro BD : buscarPatrocíniosPeçasMusicais" })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiçosMaestro.buscarPatrocíniosPeçaMusical = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id_peça_musical, patrocínios, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id_peça_musical = request.params.id;
                        return [4 /*yield*/, patroc_nio_1.default.find({
                                where: { peça_musical: { id: id_peça_musical } },
                                relations: ["patrocinador", "patrocinador.usuário", "peça_musical"],
                            })];
                    case 1:
                        patrocínios = _a.sent();
                        return [2 /*return*/, response.json(patrocínios)];
                    case 2:
                        error_9 = _a.sent();
                        return [2 /*return*/, response
                                .status(500)
                                .json({ erro: "Erro BD : buscarPatrocíniosPeçaMusical" })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ServiçosMaestro;
}());
exports.default = ServiçosMaestro;
//# sourceMappingURL=servi%C3%A7os-maestro.js.map