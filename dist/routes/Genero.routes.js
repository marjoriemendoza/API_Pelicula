"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const genero_controller_1 = __importDefault(require("../controllers/genero.controller"));
const jwt_validation_1 = require("../jwtvalidation/jwt.validation");
const router = (0, express_1.Router)();
const genero = genero_controller_1.default;
router.post("/", jwt_validation_1.checkToken, genero.createGenero);
router.get("/", jwt_validation_1.checkToken, genero.getGeneros);
router.get("/:id", jwt_validation_1.checkToken, genero.BuscarGenero);
router.delete("/:id", jwt_validation_1.checkToken, genero.DeleteGenero);
router.put("/:id", jwt_validation_1.checkToken, genero.UpdateGenero);
exports.default = router;
//# sourceMappingURL=Genero.routes.js.map