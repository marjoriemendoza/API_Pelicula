"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const genero_controller_1 = __importDefault(require("../controllers/genero.controller"));
// import { checkToken } from '../jwtvalidation/jwt.validation';
const router = (0, express_1.Router)();
const genero = genero_controller_1.default;
// router.post("/", checkToken, genero.createGenero)
// router.get("/",checkToken, genero.getGeneros)
// router.get("/:id",checkToken, genero.BuscarGenero)
// router.delete("/:id",checkToken, genero.DeleteGenero)
// router.put("/:id",checkToken, genero.UpdateGenero)
router.post("/", genero.createGenero);
router.get("/", genero.listGeneros);
router.get("/:id", genero.BuscarGenero);
router.delete("/:id", genero.DeleteGenero);
router.put("/:id", genero.UpdateGenero);
exports.default = router;
//# sourceMappingURL=Genero.routes.js.map