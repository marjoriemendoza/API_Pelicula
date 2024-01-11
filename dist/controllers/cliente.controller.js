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
const data_source_1 = require("../data-source");
const Cliente_1 = require("../models/Cliente");
const clienteRepository = data_source_1.AppDataSource.getRepository(Cliente_1.Cliente);
class ClienteController {
}
_a = ClienteController;
ClienteController.createCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastName, age, phone, } = req.body;
    try {
        const cliente = new Cliente_1.Cliente();
        cliente.name = name;
        cliente.lastName = lastName;
        cliente.phone = phone;
        cliente.age = age;
        yield clienteRepository.save(cliente);
        return res.json({
            ok: true,
            statusCode: 200,
            message: "cliente creado"
        });
    }
    catch (error) {
        return res.json({
            ok: false,
            statusCode: 500,
            message: `Error = ${error}`
        });
    }
});
// static getClientes = async(req:Request,res:Response)=>{
//   try {
//     const page = parseInt(req.query.page as string) || 1;
//     const perPage = parseInt(req.query.per_page as string) || 10;
//     const paginatedResult = await paginate(clienteRepository, page, perPage, { state: true });
//     return paginatedResult.data.length > 0
//       ? res.json({ ...paginatedResult, ok: true })
//       : res.json({ ok: false, message: 'Not found' });
//   } catch (error) {
//       return res.json({
//           ok: false,
//           message: `Error = ${error}`
//       })
//   }
// }
ClienteController.listClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clients = yield clienteRepository.find({
            where: { state: true }
        });
        return clients.length > 0
            ? res.json({
                ok: true,
                clients
            })
            : res.json({
                ok: false,
                message: 'Not found'
            });
    }
    catch (error) {
        ok: false;
        STATUS_CODES: 500;
        message: `Error= ${error}`;
    }
});
ClienteController.BuscarCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const cliente = yield clienteRepository.findOne({ where: { id, state: true } });
        return cliente
            ? res.json({ ok: true, cliente }) : res.json({ ok: false, message: "not found" });
    }
    catch (error) {
        return res.json({
            ok: false,
            message: `Error = ${error}`
        });
    }
});
ClienteController.DeleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const cliente = yield clienteRepository.findOne({ where: { id, state: true } });
        //si el genero buscado es diferente a los que hay en la base de datos
        if (!cliente) {
            throw new Error("not found");
        }
        cliente.state = false;
        yield clienteRepository.save(cliente);
        return res.json({ ok: true, message: "eliminado" });
    }
    catch (error) {
        return res.json({
            ok: false,
            message: `Error = ${error}`
        });
    }
});
ClienteController.UpdateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { name, lastName, age, phone, } = req.body;
    let cliente;
    try {
        cliente = yield clienteRepository.findOne({ where: { id, state: true } });
        if (!name) {
            throw new Error("not found");
        }
        cliente.name = name;
        cliente.lastName = lastName;
        cliente.phone = phone;
        cliente.age = age;
        yield clienteRepository.save(cliente);
        return cliente
            ? res.json({ ok: true, message: "actualizado" }) : res.json({ ok: false, message: "not found" });
    }
    catch (error) {
        return res.json({
            ok: false,
            statusCode: 500,
            message: `Error = ${error}`
        });
    }
});
exports.default = ClienteController;
//# sourceMappingURL=cliente.controller.js.map