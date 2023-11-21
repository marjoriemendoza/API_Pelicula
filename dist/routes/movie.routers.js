"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_controller_1 = __importDefault(require("../controllers/movie.controller"));
const jwt_validation_1 = require("../jwtvalidation/jwt.validation");
const router = (0, express_1.Router)();
const movie = movie_controller_1.default;
router.post("/", movie.createMovie);
router.get("/", jwt_validation_1.checkToken, movie.getMovies);
router.get("/genero/:id", jwt_validation_1.checkToken, movie.getMoviesGenero);
router.get("/:id", jwt_validation_1.checkToken, movie.getMoviesbyId);
//router.get("/", movie.getMoviesByGenre)
router.delete("/:id", jwt_validation_1.checkToken, movie.DeleteMovie);
router.put("/:id", jwt_validation_1.checkToken, movie.updateMovie);
exports.default = router;
//# sourceMappingURL=movie.routers.js.map