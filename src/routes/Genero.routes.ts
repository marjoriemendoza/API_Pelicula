import { Genero } from './../models/Genero';

import { Router } from "express"
import GeneroController, {} from "../controllers/genero.controller"
import { checkToken } from '../jwtvalidation/jwt.validation';
const router = Router();
const genero=GeneroController

router.post("/", checkToken, genero.createGenero)
router.get("/",checkToken, genero.getGeneros)
router.get("/:id",checkToken, genero.BuscarGenero)
router.delete("/:id",checkToken, genero.DeleteGenero)
router.put("/:id",checkToken, genero.UpdateGenero)
export default router