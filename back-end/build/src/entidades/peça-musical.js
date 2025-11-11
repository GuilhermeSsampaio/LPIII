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
exports.Gênero = void 0;
var typeorm_1 = require("typeorm");
var patroc_nio_1 = __importDefault(require("./patroc\u00EDnio"));
var maestro_1 = __importDefault(require("./maestro"));
var Gênero;
(function (Gênero) {
    Gênero["CL\u00C1SSICO"] = "cl\u00E1ssico";
    Gênero["POP"] = "pop";
    Gênero["ROCK"] = "rock";
})(Gênero || (exports.Gênero = Gênero = {}));
var PeçaMusical = /** @class */ (function (_super) {
    __extends(PeçaMusical, _super);
    function PeçaMusical() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], PeçaMusical.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PeçaMusical.prototype, "t\u00EDtulo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], PeçaMusical.prototype, "dura\u00E7\u00E3o", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PeçaMusical.prototype, "tom", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", enum: Gênero }),
        __metadata("design:type", String)
    ], PeçaMusical.prototype, "g\u00EAnero", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], PeçaMusical.prototype, "internacional", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return maestro_1.default; }, function (maestro) { return maestro.peças_musicais; }, {
            onDelete: "CASCADE",
        }),
        __metadata("design:type", maestro_1.default)
    ], PeçaMusical.prototype, "maestro", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return patroc_nio_1.default; }, function (patrocínio) { return patrocínio.peça_musical; }),
        __metadata("design:type", Array)
    ], PeçaMusical.prototype, "patroc\u00EDnios", void 0);
    PeçaMusical = __decorate([
        (0, typeorm_1.Entity)()
    ], PeçaMusical);
    return PeçaMusical;
}(typeorm_1.BaseEntity));
exports.default = PeçaMusical;
//# sourceMappingURL=pe%C3%A7a-musical.js.map