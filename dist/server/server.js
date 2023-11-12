"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_routes_1 = __importDefault(require("../routes/index.routes"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.middlewares();
    }
    middlewares() {
        this.app.use((0, cors_1.default)({
            origin: ["http://localhost:5173", "http://localhost:5174"],
            Credential: true
        }));
        this.app.use((0, morgan_1.default)('dev')),
            this.app.use(express_1.default.json({ limit: '50mb' })),
            this.app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
        this.app.use('/', index_routes_1.default);
    }
    listen() {
        this.app.listen((this.port = process.env.PORT || Server.PORT), () => {
            console.log(`Server is running in port${this.port}`);
        });
    }
}
//puerto de respaldo
Server.PORT = 3000;
exports.default = Server;
//# sourceMappingURL=server.js.map