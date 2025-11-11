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
var cerveja_artesanal_1 = __importDefault(require("./cerveja-artesanal"));
var gerente_emporio_1 = __importDefault(require("./gerente-emporio"));
var Encomenda = /** @class */ (function (_super) {
    __extends(Encomenda, _super);
    function Encomenda() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Encomenda.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Encomenda.prototype, "data", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Encomenda.prototype, "quantidade", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
        __metadata("design:type", Number)
    ], Encomenda.prototype, "valor_total", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: false }),
        __metadata("design:type", Boolean)
    ], Encomenda.prototype, "nota_fiscal_emitida", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return cerveja_artesanal_1.default; }, function (cerveja) { return cerveja.encomendas; }),
        __metadata("design:type", cerveja_artesanal_1.default)
    ], Encomenda.prototype, "cerveja_artesanal", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return gerente_emporio_1.default; }, function (gerente) { return gerente.encomendas; }),
        __metadata("design:type", gerente_emporio_1.default)
    ], Encomenda.prototype, "gerente_emporio", void 0);
    Encomenda = __decorate([
        (0, typeorm_1.Entity)()
    ], Encomenda);
    return Encomenda;
}(typeorm_1.BaseEntity));
exports.default = Encomenda;
//# sourceMappingURL=encomenda.js.map