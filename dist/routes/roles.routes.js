"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_1 = __importDefault(require("../controllers/User.controller"));
const salround = 10;
const router = (0, express_1.Router)();
const rol = User_controller_1.default;
router.get('/', rol.listRoles);
router.post('/', rol.createRol);
router.get('/:id', rol.byIdRol);
router.put('/:id', rol.updateRol);
router.delete('/:id', rol.deleteRol);
exports.default = router;
//# sourceMappingURL=roles.routes.js.map