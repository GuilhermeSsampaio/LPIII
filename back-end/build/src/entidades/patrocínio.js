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
var pe_a_musical_1 = __importDefault(require("./pe\u00E7a-musical"));
var patrocinador_1 = __importDefault(require("./patrocinador"));
//corrigir os atributos
var Patrocínio = /** @class */ (function (_super) {
    __extends(Patrocínio, _super);
    function Patrocínio() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Patrocínio.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Patrocínio.prototype, "or\u00E7amento_dispon\u00EDvel", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Patrocínio.prototype, "data_proposta", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Patrocínio.prototype, "show_exposicao", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return pe_a_musical_1.default; }, function (peça_musical) { return peça_musical.patrocínios; }, {
            onDelete: "CASCADE",
        }),
        __metadata("design:type", pe_a_musical_1.default)
    ], Patrocínio.prototype, "pe\u00E7a_musical", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return patrocinador_1.default; }, function (patrocinador) { return patrocinador.patrocínios; }, {
            onDelete: "CASCADE",
        }),
        __metadata("design:type", patrocinador_1.default)
    ], Patrocínio.prototype, "patrocinador", void 0);
    Patrocínio = __decorate([
        (0, typeorm_1.Entity)()
    ], Patrocínio);
    return Patrocínio;
}(typeorm_1.BaseEntity));
exports.default = Patrocínio;
//# sourceMappingURL=patroc%C3%ADnio.js.map