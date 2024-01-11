"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rentmovie_controller_1 = __importDefault(require("../controllers/rentmovie.controller"));
// import { checkToken } from '../jwtvalidation/jwt.validation';
const router = (0, express_1.Router)();
const rentmovie = rentmovie_controller_1.default;
// router.post("/", rentmovie.createRent);
//  router.get("/", checkToken, rentmovie.getRent)
//  router.put("/:id", checkToken, rentmovie.updateRentMovie);
// // router.get("/genero/:id", movie.getMoviesGenero);
//  router.get("/:id", checkToken, rentmovie.getRentbyId);
// // //router.get("/", movie.getMoviesByGenre)
// router.delete("/:id", checkToken, rentmovie.DeleteRentMovie);
router.post("/", rentmovie.createRent);
router.get("/", rentmovie.listRent);
router.put("/:id", rentmovie.updateRentMovie);
router.get("/:id", rentmovie.getRentbyId);
router.delete("/:id", rentmovie.DeleteRentMovie);
exports.default = router;
//# sourceMappingURL=rentmovie.routes.js.map