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
var typeorm_1 = require("typeorm");
var usu_rio_1 = __importDefault(require("./usu\u00E1rio"));
var cerveja_artesanal_1 = __importDefault(require("./cerveja-artesanal"));
var Criador = /** @class */ (function (_super) {
    __extends(Criador, _super);
    function Criador() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Criador.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Criador.prototype, "pais_origem", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Criador.prototype, "ano_fundacao", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Criador.prototype, "estilo_cerveja_especializado", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return cerveja_artesanal_1.default; }, function (cerveja) { return cerveja.criador; }),
        __metadata("design:type", Array)
    ], Criador.prototype, "cervejas_artesanais", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return usu_rio_1.default; }, function (usuário) { return usuário.criador; }, {
            onDelete: "CASCADE",
        }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", usu_rio_1.default)
    ], Criador.prototype, "usu\u00E1rio", void 0);
    Criador = __decorate([
        (0, typeorm_1.Entity)()
    ], Criador);
    return Criador;
}(typeorm_1.BaseEntity));
exports.default = Criador;
//# sourceMappingURL=criador.js.map