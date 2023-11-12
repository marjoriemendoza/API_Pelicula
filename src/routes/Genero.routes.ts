import { Genero } from './../models/Genero';

import { Router } from "express"
import GeneroController, {} from "../controllers/genero.controller"

const router = Router();
const genero=GeneroController

router.post("/",genero.createGenero)
router.get("/",genero.getGeneros)
router.get("/:id",genero.BuscarGenero)
router.delete("/:id",genero.DeleteGenero)
router.put("/:id",genero.UpdateGenero)
export default router