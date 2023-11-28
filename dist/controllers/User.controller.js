"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const User_1_1 = require("./../models/User.1");
const data_source_1 = require("../data-source");
const pagination_1 = require("../pagination");
const salround = 10;
class UserController {
}
_a = UserController;
//List
UserController.listUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repoUsers = data_source_1.AppDataSource.getRepository(User_1_1.User);
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.per_page) || 10;
        const paginatedResult = yield (0, pagination_1.paginate)(repoUsers, page, perPage, { state: true });
        return paginatedResult.data.length > 0
            ? res.json(Object.assign(Object.assign({}, paginatedResult), { ok: true }))
            : res.json({ ok: false, message: 'Not found' });
    }
    catch (e) {
        return res.json({
            ok: false,
            msg: `ERROR => ${e}`,
        });
    }
});
//CREATE
UserController.createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const repoUsers = data_source_1.AppDataSource.getRepository(User_1_1.User);
    try {
        const userExist = yield repoUsers.findOne({ where: { email } });
        if (userExist) {
            return res.json({ ok: false, msg: `Email '${email}' already exists` });
        }
        const users = new User_1_1.User();
        users.name = name;
        users.email = email;
        users.password = password;
        users.hashPassword();
        const savedUser = yield repoUsers.save(users);
        savedUser.password = undefined;
        yield repoUsers.save(users);
        return res.json({
            ok: true,
            msg: "User WAS CREATE",
        });
    }
    catch (e) {
        return res.json({
            ok: false,
            msg: ` ERROR => ${e}`,
        });
    }
});
//UPDATE
UserController.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { name, email, password } = req.body;
    const repoUsers = data_source_1.AppDataSource.getRepository(User_1_1.User);
    let users;
    try {
        users = yield repoUsers.findOne({
            where: { id, state: true },
        });
        if (!users) {
            throw new Error("User dont exist in data base");
        }
        users.name = name;
        users.email = email;
        users.password = password;
        yield repoUsers.save(users);
        return res.json({
            ok: true,
            msg: "User was update",
        });
    }
    catch (e) {
        return res.json({
            ok: false,
            msg: "Server error",
        });
    }
});
//SEARCH BYID
UserController.byIdUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const repoUser = data_source_1.AppDataSource.getRepository(User_1_1.User);
    try {
        const user = yield repoUser.findOne({
            where: { id, state: true },
        });
        return user
            ? res.json({ ok: true, user, msg: "success" })
            : res.json({ ok: false, msg: "The id dont exist" });
    }
    catch (e) {
        return res.json({
            ok: false,
            msg: "Server error",
        });
    }
});
//DELETE
UserController.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const repoUser = data_source_1.AppDataSource.getRepository(User_1_1.User);
    try {
        const user = yield repoUser.findOne({
            where: { id, state: true },
        });
        if (!user) {
            throw new Error("User DONT EXIST IN DATA BASE");
        }
        user.state = false;
        yield repoUser.save(user);
        return res.json({
            ok: true,
            msg: "User WAS DELETE",
        });
    }
    catch (e) {
        return res.json({
            ok: false,
            msg: `SERVER ERROR => ${e}`,
        });
    }
});
exports.default = UserController;
//# sourceMappingURL=User.controller.js.map