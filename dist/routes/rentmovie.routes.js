"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rentmovie_controller_1 = __importDefault(require("../controllers/rentmovie.controller"));
const jwt_validation_1 = require("../jwtvalidation/jwt.validation");
const router = (0, express_1.Router)();
const rentmovie = rentmovie_controller_1.default;
router.post("/", rentmovie.createRent);
router.get("/", jwt_validation_1.checkToken, rentmovie.getRent);
router.put("/:id", jwt_validation_1.checkToken, rentmovie.updateRentMovie);
// router.get("/genero/:id", movie.getMoviesGenero);
router.get("/:id", jwt_validation_1.checkToken, rentmovie.getRentbyId);
// //router.get("/", movie.getMoviesByGenre)
router.delete("/:id", jwt_validation_1.checkToken, rentmovie.DeleteRentMovie);
exports.default = router;
//# sourceMappingURL=rentmovie.routes.js.map