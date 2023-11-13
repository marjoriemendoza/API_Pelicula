
import {Router} from "express"
import dotenv from "dotenv"
import routerGenero from "./Genero.routes"
import routerMovie from "./movie.routers"

dotenv.config()
const URL = process.env.url
const routes =Router();
routes.use(`${URL}/genero`,routerGenero)
routes.use(`${URL}/movie`,routerMovie)

export default routes
 
