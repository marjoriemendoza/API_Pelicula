"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const Genero_routes_1 = __importDefault(require("./Genero.routes"));
const movie_routers_1 = __importDefault(require("./movie.routers"));
const cliente_routes_1 = __importDefault(require("./cliente.routes"));
const rentmovie_routes_1 = __importDefault(require("./rentmovie.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
dotenv_1.default.config();
const URL = process.env.url;
const routes = (0, express_1.Router)();
routes.use(`${URL}/genero`, Genero_routes_1.default);
routes.use(`${URL}/movie`, movie_routers_1.default);
routes.use(`${URL}/cliente`, cliente_routes_1.default);
routes.use(`${URL}/rent`, rentmovie_routes_1.default);
routes.use(`${URL}/user`, user_routes_1.default);
routes.use(`${URL}/login`, auth_routes_1.default);
exports.default = routes;
//# sourceMappingURL=index.routes.js.map