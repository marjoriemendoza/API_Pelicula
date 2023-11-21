import { Cliente } from './../models/Cliente';

import { Router } from "express"
import ClienteController, {} from "../controllers/cliente.controller"
import { checkToken } from '../jwtvalidation/jwt.validation';
const router = Router();
const cliente=ClienteController

router.post("/", checkToken, cliente.createCliente)
router.get("/", checkToken, cliente.getClientes)
router.get("/:id",checkToken,cliente.BuscarCliente)
router.delete("/:id",checkToken, cliente.DeleteCliente)
router.put("/:id",checkToken, cliente.UpdateCliente)
export default router