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
var bcrypt_1 = __importDefault(require("bcrypt"));
var dotenv_1 = __importDefault(require("dotenv"));
var md5_1 = __importDefault(require("md5"));
var jsonwebtoken_1 = require("jsonwebtoken");
var usu_rio_1 = __importStar(require("../entidades/usu\u00E1rio"));
var maestro_1 = __importDefault(require("../entidades/maestro"));
var patrocinador_1 = __importDefault(require("../entidades/patrocinador"));
var criador_1 = __importDefault(require("../entidades/criador"));
var gerente_emporio_1 = __importDefault(require("../entidades/gerente-emporio"));
var typeorm_1 = require("typeorm");
dotenv_1.default.config();
var SALT = 10;
var SENHA_JWT = process.env.SENHA_JWT;
var ServiçosUsuário = /** @class */ (function () {
    function ServiçosUsuário() {
    }
    ServiçosUsuário.verificarCpfExistente = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var cpf_encriptado, usuário, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ServiçosUsuário.listarTodosUsuários()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        cpf_encriptado = (0, md5_1.default)(request.params.cpf);
                        return [4 /*yield*/, usu_rio_1.default.findOne(cpf_encriptado)];
                    case 3:
                        usuário = _a.sent();
                        console.log("cpf", cpf_encriptado);
                        if (usuário)
                            return [2 /*return*/, response.status(400).json({ erro: "CPF já cadastrado." })];
                        else
                            return [2 /*return*/, response.json()];
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        return [2 /*return*/, response
                                .status(500)
                                .json({ erro: "Erro BD: verificarCpfCadastrado" })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // ... código existente ...
    ServiçosUsuário.listarTodosUsuários = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usuários, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, usu_rio_1.default.find()];
                    case 1:
                        usuários = _a.sent();
                        console.log("users:", usuários);
                        console.log("=== Lista de Todos os Usuários ===");
                        // usuários.forEach((usuário, index) => {
                        //   console.log(`\nUsuário ${index + 1}:`);
                        //   console.log(`Nome: ${usuário.nome}`);
                        //   console.log(`CPF: ${usuário.cpf}`);
                        //   console.log(`Perfil: ${usuário.perfil}`);
                        //   console.log(`Email: ${usuário.email}`);
                        //   console.log(`Status: ${usuário.status}`);
                        //   console.log("------------------------");
                        // });
                        // console.log(`Total de usuários: ${usuários.length}`);
                        return [2 /*return*/, usuários];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Erro ao listar usuários:", error_2);
                        throw new Error("Erro ao buscar usuários no banco de dados");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiçosUsuário.verificarCadastroCompleto = function (usuário) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, maestro, patrocinador, criador, gerente;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = usuário.perfil;
                        switch (_a) {
                            case usu_rio_1.Perfil.MAESTRO: return [3 /*break*/, 1];
                            case usu_rio_1.Perfil.PATROCINADOR: return [3 /*break*/, 3];
                            case usu_rio_1.Perfil.CRIADOR: return [3 /*break*/, 5];
                            case usu_rio_1.Perfil.GERENTE_EMPORIO: return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 9];
                    case 1: return [4 /*yield*/, maestro_1.default.findOne({
                            where: { usuário: usuário.cpf },
                            relations: ["usuário"],
                        })];
                    case 2:
                        maestro = _b.sent();
                        if (!maestro)
                            return [2 /*return*/, false];
                        return [2 /*return*/, true];
                    case 3: return [4 /*yield*/, patrocinador_1.default.findOne({
                            where: { usuário: usuário.cpf },
                            relations: ["usuário"],
                        })];
                    case 4:
                        patrocinador = _b.sent();
                        if (!patrocinador)
                            return [2 /*return*/, false];
                        return [2 /*return*/, true];
                    case 5: return [4 /*yield*/, criador_1.default.findOne({
                            where: { usuário: usuário.cpf },
                            relations: ["usuário"],
                        })];
                    case 6:
                        criador = _b.sent();
                        if (!criador)
                            return [2 /*return*/, false];
                        return [2 /*return*/, true];
                    case 7: return [4 /*yield*/, gerente_emporio_1.default.findOne({
                            where: { usuário: usuário.cpf },
                            relations: ["usuário"],
                        })];
                    case 8:
                        gerente = _b.sent();
                        if (!gerente)
                            return [2 /*return*/, false];
                        return [2 /*return*/, true];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ServiçosUsuário.logarUsuário = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nome_login, senha, cpf_encriptado, usuário, cadastro_completo, senha_correta, token, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        _a = request.body, nome_login = _a.nome_login, senha = _a.senha;
                        cpf_encriptado = (0, md5_1.default)(nome_login);
                        return [4 /*yield*/, usu_rio_1.default.findOne(cpf_encriptado)];
                    case 1:
                        usuário = _b.sent();
                        if (!usuário)
                            return [2 /*return*/, response
                                    .status(404)
                                    .json({ erro: "Nome de usuário não cadastrado." })];
                        return [4 /*yield*/, ServiçosUsuário.verificarCadastroCompleto(usuário)];
                    case 2:
                        cadastro_completo = _b.sent();
                        if (!!cadastro_completo) return [3 /*break*/, 4];
                        return [4 /*yield*/, usu_rio_1.default.remove(usuário)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, response.status(400).json({
                                erro: "Cadastro incompleto. Por favor, realize o cadastro novamente.",
                            })];
                    case 4: return [4 /*yield*/, bcrypt_1.default.compare(senha, usuário.senha)];
                    case 5:
                        senha_correta = _b.sent();
                        if (!senha_correta)
                            return [2 /*return*/, response.status(401).json({ erro: "Senha incorreta." })];
                        token = (0, jsonwebtoken_1.sign)({ perfil: usuário.perfil, email: usuário.email }, SENHA_JWT, { subject: usuário.nome, expiresIn: "1d" });
                        return [2 /*return*/, response.json({
                                usuárioLogado: {
                                    nome: usuário.nome,
                                    perfil: usuário.perfil,
                                    email: usuário.email,
                                    questão: usuário.questão,
                                    status: usuário.status,
                                    cor_tema: usuário.cor_tema,
                                    token: token,
                                },
                            })];
                    case 6:
                        error_3 = _b.sent();
                        return [2 /*return*/, response.status(500).json({ erro: "Erro BD: logarUsuário" })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ServiçosUsuário.cadastrarUsuário = function (usuário_informado) {
        return __awaiter(this, void 0, void 0, function () {
            var cpf, nome, perfil, email, senha, questão, resposta, cor_tema, cpf_encriptado, senha_encriptada, resposta_encriptada, usuário, token, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        cpf = usuário_informado.cpf, nome = usuário_informado.nome, perfil = usuário_informado.perfil, email = usuário_informado.email, senha = usuário_informado.senha, questão = usuário_informado.questão, resposta = usuário_informado.resposta, cor_tema = usuário_informado.cor_tema;
                        console.log("ServiçosUsuário.cadastrarUsuário:nome -- " + nome);
                        cpf_encriptado = (0, md5_1.default)(cpf);
                        return [4 /*yield*/, bcrypt_1.default.hash(senha, SALT)];
                    case 1:
                        senha_encriptada = _a.sent();
                        return [4 /*yield*/, bcrypt_1.default.hash(resposta, SALT)];
                    case 2:
                        resposta_encriptada = _a.sent();
                        usuário = usu_rio_1.default.create({
                            cpf: cpf_encriptado,
                            nome: nome,
                            perfil: perfil,
                            email: email,
                            senha: senha_encriptada,
                            questão: questão,
                            resposta: resposta_encriptada,
                            cor_tema: cor_tema,
                        });
                        token = (0, jsonwebtoken_1.sign)({ perfil: usuário.perfil, email: usuário.email }, SENHA_JWT, { subject: usuário.nome, expiresIn: "1d" });
                        return [2 /*return*/, { usuário: usuário, senha: senha, token: token }];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error("Erro BD: cadastrarUsuário");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ServiçosUsuário.alterarUsuário = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, cpf, senha, questão, resposta, cor_tema, email, cpf_encriptado, senha_encriptada, resposta_encriptada, token, usuário, usuário_info, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        _a = request.body, cpf = _a.cpf, senha = _a.senha, questão = _a.questão, resposta = _a.resposta, cor_tema = _a.cor_tema, email = _a.email;
                        cpf_encriptado = (0, md5_1.default)(cpf);
                        senha_encriptada = void 0, resposta_encriptada = void 0;
                        token = void 0;
                        return [4 /*yield*/, usu_rio_1.default.findOne(cpf_encriptado)];
                    case 1:
                        usuário = _b.sent();
                        if (email) {
                            usuário.email = email;
                            token = (0, jsonwebtoken_1.sign)({ perfil: usuário.perfil, email: email }, SENHA_JWT, {
                                subject: usuário.nome,
                                expiresIn: "1d",
                            });
                        }
                        if (cor_tema)
                            usuário.cor_tema = cor_tema;
                        if (!senha) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt_1.default.hash(senha, SALT)];
                    case 2:
                        senha_encriptada = _b.sent();
                        usuário.senha = senha_encriptada;
                        _b.label = 3;
                    case 3:
                        if (!resposta) return [3 /*break*/, 5];
                        return [4 /*yield*/, bcrypt_1.default.hash(resposta, SALT)];
                    case 4:
                        resposta_encriptada = _b.sent();
                        usuário.questão = questão;
                        usuário.resposta = resposta_encriptada;
                        _b.label = 5;
                    case 5: return [4 /*yield*/, usu_rio_1.default.save(usuário)];
                    case 6:
                        _b.sent();
                        usuário_info = {
                            nome: usuário.nome,
                            perfil: usuário.perfil,
                            email: usuário.email,
                            questão: usuário.questão,
                            status: usuário.status,
                            cor_tema: usuário.cor_tema,
                            token: null,
                        };
                        if (token)
                            usuário_info.token = token;
                        return [2 /*return*/, response.json(usuário_info)];
                    case 7:
                        error_5 = _b.sent();
                        return [2 /*return*/, response.status(500).json({ erro: "Erro BD: alterarUsuário" })];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ServiçosUsuário.removerUsuário = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var cpf_encriptado_1, entityManager, error_6;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        cpf_encriptado_1 = (0, md5_1.default)(request.params.cpf);
                        entityManager = (0, typeorm_1.getManager)();
                        return [4 /*yield*/, entityManager.transaction(function (transactionManager) { return __awaiter(_this, void 0, void 0, function () {
                                var usuário;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, transactionManager.findOne(usu_rio_1.default, cpf_encriptado_1)];
                                        case 1:
                                            usuário = _a.sent();
                                            return [4 /*yield*/, transactionManager.remove(usuário)];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/, response.json()];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        return [2 /*return*/, response.status(500).json({ erro: "Erro BD: removerUsuário" })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiçosUsuário.buscarQuestãoSegurança = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var cpf_encriptado, usuário, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        cpf_encriptado = (0, md5_1.default)(request.params.cpf);
                        return [4 /*yield*/, usu_rio_1.default.findOne(cpf_encriptado)];
                    case 1:
                        usuário = _a.sent();
                        if (usuário)
                            return [2 /*return*/, response.json({ questão: usuário.questão })];
                        else
                            return [2 /*return*/, response.status(404).json({ mensagem: "CPF não cadastrado" })];
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _a.sent();
                        return [2 /*return*/, response
                                .status(500)
                                .json({ erro: "Erro BD : buscarQuestãoSegurança" })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiçosUsuário.verificarRespostaCorreta = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, cpf, resposta, cpf_encriptado, usuário, resposta_correta, token, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = request.body, cpf = _a.cpf, resposta = _a.resposta;
                        cpf_encriptado = (0, md5_1.default)(cpf);
                        return [4 /*yield*/, usu_rio_1.default.findOne(cpf_encriptado)];
                    case 1:
                        usuário = _b.sent();
                        return [4 /*yield*/, bcrypt_1.default.compare(resposta, usuário.resposta)];
                    case 2:
                        resposta_correta = _b.sent();
                        if (!resposta_correta)
                            return [2 /*return*/, response.status(401).json({ mensagem: "Resposta incorreta." })];
                        token = (0, jsonwebtoken_1.sign)({ perfil: usuário.perfil, email: usuário.email }, process.env.SENHA_JWT, { subject: usuário.nome, expiresIn: "1h" });
                        return [2 /*return*/, response.json({ token: token })];
                    case 3:
                        error_8 = _b.sent();
                        return [2 /*return*/, response
                                .status(500)
                                .json({ erro: "Erro BD: verificarRespostaCorreta" })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ServiçosUsuário;
}());
exports.default = ServiçosUsuário;
//# sourceMappingURL=servi%C3%A7os-usu%C3%A1rio.js.map