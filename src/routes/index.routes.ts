
import {Router} from "express"
import dotenv from "dotenv"
import routerGenero from "./Genero.routes"
import routerMovie from "./movie.routers"
import routerCliente from "./cliente.routes"

dotenv.config()
const URL = process.env.url
const routes =Router();
routes.use(`${URL}/genero`,routerGenero)
routes.use(`${URL}/movie`,routerMovie)
routes.use(`${URL}/cliente`,routerCliente)

export default routes
 
