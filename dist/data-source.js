"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
//host,puerto de base de datos,puerto,usuario
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '200409',
    port: 3306,
    database: 'pelicula_api',
    synchronize: true,
    logging: true,
    entities: ['dist/models/**/*.js'],
    subscribers: ['dist/subscribers/**/*.js'],
    migrations: ['dist/migrations/**/*.js']
});
//# sourceMappingURL=data-source.js.map