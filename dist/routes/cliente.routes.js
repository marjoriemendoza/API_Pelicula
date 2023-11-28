"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cliente_controller_1 = __importDefault(require("../controllers/cliente.controller"));
// import { checkToken } from '../jwtvalidation/jwt.validation';
const router = (0, express_1.Router)();
const cliente = cliente_controller_1.default;
// router.post("/", checkToken, cliente.createCliente)
// router.get("/", checkToken, cliente.getClientes)
// router.get("/:id",checkToken,cliente.BuscarCliente)
// router.delete("/:id",checkToken, cliente.DeleteCliente)
// router.put("/:id",checkToken, cliente.UpdateCliente)
router.post("/", cliente.createCliente);
exports.default = router;
//# sourceMappingURL=cliente.routes.js.map