"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_controller_1 = __importDefault(require("../controllers/movie.controller"));
const router = (0, express_1.Router)();
const movie = movie_controller_1.default;
router.post("/", movie.createMovie);
router.get("/", movie.getMovies);
router.get("/genero/:id", movie.getMoviesGenero);
router.get("/:id", movie.getMoviesbyId);
//router.get("/", movie.getMoviesByGenre)
router.delete("/:id", movie.DeleteMovie);
router.put("/:id", movie.updateMovie);
exports.default = router;
//# sourceMappingURL=movie.routers.js.map