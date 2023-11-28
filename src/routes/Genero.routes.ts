import { Genero } from './../models/Genero';

import { Router } from "express"
import GeneroController, {} from "../controllers/genero.controller"
// import { checkToken } from '../jwtvalidation/jwt.validation';
const router = Router();
const genero=GeneroController

// router.post("/", checkToken, genero.createGenero)
// router.get("/",checkToken, genero.getGeneros)
// router.get("/:id",checkToken, genero.BuscarGenero)
// router.delete("/:id",checkToken, genero.DeleteGenero)
// router.put("/:id",checkToken, genero.UpdateGenero)


router.post("/",  genero.createGenero)
router.get("/", genero.listGeneros)
router.get("/:id", genero.BuscarGenero)
router.delete("/:id", genero.DeleteGenero)
router.put("/:id", genero.UpdateGenero)

export default router