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
const Cliente_1 = require("./../models/Cliente");
const data_source_1 = require("./../data-source");
const RentMovie_1_1 = require("../models/RentMovie.1");
const pagination_1 = require("../pagination");
const rentmovieRepository = data_source_1.AppDataSource.getRepository(RentMovie_1_1.RentMovie);
class RentMovieController {
}
_a = RentMovieController;
RentMovieController.createRent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_movie, id_costumer, loan_date, devolution_date, price, amount, subTotal, total, } = req.body;
    const clienteRepository = data_source_1.AppDataSource.getRepository(Cliente_1.Cliente);
    try {
        const rent = new RentMovie_1_1.RentMovie();
        rent.movie = id_movie;
        rent.cliente = id_costumer;
        rent.loan_date = loan_date;
        rent.devolution_date = devolution_date;
        rent.amount = amount;
        rent.price = price;
        rent.subTotal = subTotal;
        rent.total = total;
        let st = price * amount;
        rent.subTotal = st;
        rent.total = parseFloat((rent.subTotal).toFixed(2));
        let disc1 = subTotal * 0.15;
        const client_f = yield clienteRepository.findOne({ where: { id: id_costumer } });
        if (client_f.points >= 10 && client_f.points < 20) {
            client_f.points = client_f.points + rent.amount;
            rent.total = parseFloat((rent.subTotal - (rent.subTotal * 0.10)).toFixed(2));
            yield rentmovieRepository.save(rent);
            clienteRepository.save(client_f);
            return res.json({ ok: true, message: "poins are 10 or more get a 15% discount rent was creaetd", });
        }
        else if (client_f.points >= 20) {
            client_f.points = client_f.points + rent.amount;
            rent.total = rent.subTotal - (rent.subTotal * 0.20);
            yield rentmovieRepository.save(rent);
            clienteRepository.save(client_f);
            return res.json({ ok: true, message: "poins are 20 or more get a 20% discount rent was creaetd", });
        }
        else {
            client_f.points = client_f.points + rent.amount;
            yield rentmovieRepository.save(rent);
            clienteRepository.save(client_f);
            return res.json({ ok: true, message: " rent was creaetd", });
        }
    }
    catch (error) {
        return res.json({ ok: false, message: `error that movie does not exist = ${error.message}`, });
    }
});
RentMovieController.getRent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.per_page) || 10;
        const paginatedResult = yield (0, pagination_1.paginate)(rentmovieRepository, page, perPage, { state: true });
        return paginatedResult.data.length > 0
            ? res.json(Object.assign(Object.assign({}, paginatedResult), { ok: true }))
            : res.json({ ok: false, message: 'Not found' });
    }
    catch (error) {
        return res.json({
            ok: false,
            message: `error = ${error.message}`,
        });
    }
});
RentMovieController.getRentbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const generoId = req.query.generoId || "";
    try {
        const movie = yield rentmovieRepository.findOne({
            where: {
                id,
                state: true,
            },
            relations: { movie: true },
        });
        return movie
            ? res.json({ ok: true, movie })
            : res.json({ ok: false, message: "tht rent id does not exist" });
    }
    catch (error) {
        return res.json({
            ok: false,
            message: `Error: ${error.message}`,
        });
    }
});
RentMovieController.updateRentMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { id_movie, id_costumer, loan_date, devolution_date, price, amount, totalPrice } = req.body;
    let rentmovie;
    try {
        rentmovie = yield rentmovieRepository.findOne({ where: { id, state: true } });
        if (!id) {
            throw new Error("not found");
        }
        const rent = new RentMovie_1_1.RentMovie();
        rentmovie.id_movie = id_movie;
        rentmovie.id_costumer = id_costumer;
        rentmovie.loan_date = loan_date;
        rentmovie.devolution_date = devolution_date;
        rentmovie.price = price;
        rent.amount = amount;
        yield rentmovieRepository.save(rentmovie);
        return rentmovie
            ? res.json({ ok: true, rentmovie: "renta actualizada" })
            : res.json({ ok: false, message: "there's nothig here pal" });
    }
    catch (error) {
        return res.json({
            ok: false,
            STATUS_CODE: 500,
            message: `error = ${error.message}`,
        });
    }
});
RentMovieController.DeleteRentMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const rentmovie = yield rentmovieRepository.findOne({
            where: { id, state: true },
        });
        if (!rentmovie) {
            throw new Error("not found");
        }
        rentmovie.state = false;
        yield rentmovieRepository.save(rentmovie);
        return res.json({ ok: true, message: "renta eliminada" });
    }
    catch (error) {
        return res.json({
            ok: false,
            message: `Error = ${error}`
        });
    }
});
exports.default = RentMovieController;
//# sourceMappingURL=rentmovie.controller.js.map