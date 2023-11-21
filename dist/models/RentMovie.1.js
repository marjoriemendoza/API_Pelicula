"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentMovie = void 0;
const typeorm_1 = require("typeorm");
const Movie_1_1 = require("./Movie.1");
const Cliente_1 = require("./Cliente");
let RentMovie = class RentMovie {
};
exports.RentMovie = RentMovie;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RentMovie.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Movie_1_1.Movie),
    __metadata("design:type", Movie_1_1.Movie)
], RentMovie.prototype, "movie", void 0);
__decorate([
    (0, typeorm_1.RelationId)((rentmovie) => rentmovie.movie),
    __metadata("design:type", Number)
], RentMovie.prototype, "id_movie", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Cliente_1.Cliente),
    __metadata("design:type", Cliente_1.Cliente)
], RentMovie.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.RelationId)((rentmovie) => rentmovie.cliente),
    __metadata("design:type", Number)
], RentMovie.prototype, "id_costumer", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RentMovie.prototype, "loan_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], RentMovie.prototype, "devolution_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RentMovie.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RentMovie.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], RentMovie.prototype, "subTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], RentMovie.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], RentMovie.prototype, "state", void 0);
exports.RentMovie = RentMovie = __decorate([
    (0, typeorm_1.Entity)()
], RentMovie);
//# sourceMappingURL=RentMovie.1.js.map