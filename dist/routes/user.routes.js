"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_1 = __importDefault(require("../controllers/User.controller"));
// import { checkToken } from '../jwtvalidation/jwt.validation';
const router = (0, express_1.Router)();
const user = User_controller_1.default;
// router.get('/', checkToken, user.listUsers)
// router.post('/', checkToken, user.createUser)
// router.get('/:id', checkToken, user.byIdUser)
// router.put('/:id', checkToken, user.updateUser)
// router.delete('/:id',checkToken, user.deleteUser)
router.post('/', user.createUser);
router.put('/:id', user.updateUser);
router.get('/', user.listUsers);
router.delete('/:id', user.deleteUser);
router.get('/:id', user.byIdUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map