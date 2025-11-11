"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nacionalidade = exports.Estilo = void 0;
var typeorm_1 = require("typeorm");
var usu_rio_1 = __importDefault(require("./usu\u00E1rio"));
var pe_a_musical_1 = __importDefault(require("./pe\u00E7a-musical"));
var Estilo;
(function (Estilo) {
    Estilo["SIMPLES"] = "simples";
    Estilo["ELEGANTE"] = "elegante";
})(Estilo || (exports.Estilo = Estilo = {}));
var Nacionalidade;
(function (Nacionalidade) {
    Nacionalidade["BRASILEIRO"] = "brasileiro";
    Nacionalidade["ESTRANGEIRO"] = "estrangeiro";
})(Nacionalidade || (exports.Nacionalidade = Nacionalidade = {}));
var Maestro = /** @class */ (function (_super) {
    __extends(Maestro, _super);
    function Maestro() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Maestro.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", enum: Estilo }),
        __metadata("design:type", String)
    ], Maestro.prototype, "estilo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Maestro.prototype, "anos_experi\u00EAncia", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", enum: Nacionalidade }),
        __metadata("design:type", String)
    ], Maestro.prototype, "nacionalidade", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return pe_a_musical_1.default; }, function (peça_musical) { return peça_musical.maestro; }),
        __metadata("design:type", Array)
    ], Maestro.prototype, "pe\u00E7as_musicais", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return usu_rio_1.default; }, function (usuário) { return usuário.maestro; }, {
            onDelete: "CASCADE",
        }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", usu_rio_1.default)
    ], Maestro.prototype, "usu\u00E1rio", void 0);
    Maestro = __decorate([
        (0, typeorm_1.Entity)()
    ], Maestro);
    return Maestro;
}(typeorm_1.BaseEntity));
exports.default = Maestro;
//# sourceMappingURL=maestro.js.map