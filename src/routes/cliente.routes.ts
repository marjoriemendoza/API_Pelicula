import { Cliente } from './../models/Cliente';

import { Router } from "express"
import ClienteController, {} from "../controllers/cliente.controller"

const router = Router();
const cliente=ClienteController

router.post("/",cliente.createCliente)
router.get("/",cliente.getClientes)
router.get("/:id",cliente.BuscarCliente)
router.delete("/:id",cliente.DeleteCliente)
router.put("/:id",cliente.UpdateCliente)
export default router