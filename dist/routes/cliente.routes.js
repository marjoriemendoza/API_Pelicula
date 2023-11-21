"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cliente_controller_1 = __importDefault(require("../controllers/cliente.controller"));
const jwt_validation_1 = require("../jwtvalidation/jwt.validation");
const router = (0, express_1.Router)();
const cliente = cliente_controller_1.default;
router.post("/", jwt_validation_1.checkToken, cliente.createCliente);
router.get("/", jwt_validation_1.checkToken, cliente.getClientes);
router.get("/:id", jwt_validation_1.checkToken, cliente.BuscarCliente);
router.delete("/:id", jwt_validation_1.checkToken, cliente.DeleteCliente);
router.put("/:id", jwt_validation_1.checkToken, cliente.UpdateCliente);
exports.default = router;
//# sourceMappingURL=cliente.routes.js.map