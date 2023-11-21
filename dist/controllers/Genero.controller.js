"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Genero_1 = require("../models/Genero");
const pagination_1 = require("../pagination");
const generoRepository = data_source_1.AppDataSource.getRepository(Genero_1.Genero);
class GeneroController {
}
_a = GeneroController;
GeneroController.createGenero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req.body;
    try {
        const genero = new Genero_1.Genero();
        genero.type = type;
        yield generoRepository.save(genero);
        return res.json({
            ok: true,
            statusCode: 200,
            message: "genero creado"
        });
    }
    catch (error) {
        return res.json({
            ok: false,
            statusCode: 500,
            message: `Error = ${error}`
        });
    }
});
GeneroController.getGeneros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.per_page) || 10;
        const paginatedResult = yield (0, pagination_1.paginate)(generoRepository, page, perPage, { state: true });
        return paginatedResult.data.length > 0
            ? res.json(Object.assign(Object.assign({}, paginatedResult), { ok: true }))
            : res.json({ ok: false, message: 'Not found' });
    }
    catch (error) {
        return res.json({
            ok: false,
            message: `Error = ${error}`
        });
    }
});
GeneroController.BuscarGenero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const genero = yield generoRepository.findOne({ where: { id, state: true } });
        return genero
            ? res.json({ ok: true, genero }) : res.json({ ok: false, message: "not found" });
    }
    catch (error) {
        return res.json({
            ok: false,
            message: `Error = ${error}`
        });
    }
});
GeneroController.DeleteGenero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const genero = yield generoRepository.findOne({ where: { id, state: true } });
        //si el genero buscado es diferente a los que hay en la base de datos
        if (!genero) {
            throw new Error("not found");
        }
        genero.state = false;
        yield generoRepository.save(genero);
        return res.json({ ok: true, message: "genero eliminado" });
    }
    catch (error) {
        return res.json({
            ok: false,
            message: `Error = ${error}`
        });
    }
});
GeneroController.UpdateGenero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { type, } = req.body;
    let genero;
    try {
        genero = yield generoRepository.findOne({ where: { id, state: true } });
        if (!genero) {
            throw new Error("not found");
        }
        genero.type = type;
        yield generoRepository.save(genero);
        return genero
            ? res.json({ ok: true, message: "actualizado" }) : res.json({ ok: false, message: "not found" });
    }
    catch (error) {
        return res.json({
            ok: false,
            statusCode: 500,
            message: `Error = ${error}`
        });
    }
});
exports.default = GeneroController;
//# sourceMappingURL=genero.controller.js.map