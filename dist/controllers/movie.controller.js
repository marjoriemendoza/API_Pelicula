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
const Movie_1_1 = require("./../models/Movie.1");
const Genero_1 = require("./../models/Genero");
const data_source_1 = require("../data-source");
const pagination_1 = require("../pagination");
const typeorm_1 = require("typeorm");
const movieRepository = data_source_1.AppDataSource.getRepository(Movie_1_1.Movie);
class MovieController {
}
_a = MovieController;
MovieController.createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, duration, director, language, image, ranking, generoId } = req.body;
    const generoRepository = data_source_1.AppDataSource.getRepository(Genero_1.Genero);
    try {
        const movie = new Movie_1_1.Movie();
        movie.title = title;
        movie.duration = duration;
        movie.director = director;
        movie.language = language;
        movie.image = image;
        movie.ranking = ranking;
        movie.genero = generoId;
        yield movieRepository.save(movie);
        return res.json({
            ok: true,
            message: "Movie was created",
        });
    }
    catch (error) {
        return res.json({
            ok: false,
            message: `error = ${error.message}`,
        });
    }
});
MovieController.getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.query.title || "";
    const genero = req.query.genero || "";
    const generoId = req.query.generoId || "";
    const repoMovie = data_source_1.AppDataSource.getRepository(Movie_1_1.Movie);
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.per_page) || 10;
        const paginatedResult = yield (0, pagination_1.paginate)(movieRepository, page, perPage, { state: true });
        const movies = yield movieRepository.find({
            where: {
                state: true,
                title: (0, typeorm_1.Like)(`%${title}%`),
                genero: { type: (0, typeorm_1.Like)(`%${genero}%`) },
            },
            relations: { genero: true },
        });
        return movies.length > 0
            ? res.json({ ok: true, movies, message: "Movie list" })
            : res.json({ ok: false, message: "Movies not found" });
    }
    catch (error) {
        return res.json({
            ok: false,
            message: `error = ${error.message}`,
        });
    }
});
MovieController.getMoviesGenero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const generoId = Number(req.params.id) || 0;
    const repoMovie = data_source_1.AppDataSource.getRepository(Movie_1_1.Movie);
    try {
        const movie = yield movieRepository.find({
            where: {
                state: true,
                genero: { id: generoId },
            },
            relations: { genero: true },
        });
        return movie.length > 0
            ? res.json({ ok: true, movie })
            : res.json({ ok: false, message: "that Id genero doesn't exist" });
    }
    catch (error) {
        return res.json({
            ok: false,
            message: `error = ${error.message}`,
        });
    }
});
MovieController.getMoviesbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const generoId = req.query.generoId || "";
    try {
        const movie = yield movieRepository.findOne({
            where: {
                id,
                state: true,
            },
            relations: { genero: true },
        });
        return movie
            ? res.json({ ok: true, movie })
            : res.json({ ok: false, message: "that movie id does not exist" });
    }
    catch (error) {
        return res.json({
            ok: false,
            message: `Error: ${error.message}`,
        });
    }
});
MovieController.DeleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const movie = yield movieRepository.findOne({
            where: { id, state: true },
        });
        if (!movie) {
            throw new Error("Movie not found");
        }
        movie.state = false;
        yield movieRepository.save(movie);
        return res.json({ ok: true, message: "Movie was deleted" });
    }
    catch (error) {
        return res.json({
            ok: false,
            message: `Error = ${error}`
        });
    }
});
MovieController.updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { title, duration, director, language, image, ranking, generoId } = req.body;
    let movie;
    try {
        movie = yield movieRepository.findOne({ where: { id, state: true } });
        if (!title) {
            throw new Error("not found");
        }
        movie.title = title;
        movie.duration = duration;
        movie.director = director;
        movie.language = language;
        movie.image = image;
        movie.ranking = ranking;
        movie.genero = generoId;
        yield movieRepository.save(movie);
        return movie
            ? res.json({ ok: true, movie })
            : res.json({ ok: false, message: "Id not found" });
    }
    catch (error) {
        return res.json({
            ok: false,
            STATUS_CODE: 500,
            message: `error = ${error.message}`,
        });
    }
});
exports.default = MovieController;
//# sourceMappingURL=movie.controller.js.map