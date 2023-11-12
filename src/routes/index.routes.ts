
import {Router} from "express"
import dotenv from "dotenv"
import routerGenero from "./Genero.routes"

dotenv.config()
const URL = process.env.url
const routes =Router();
routes.use(`${URL}/genero`,routerGenero)

export default routes
 
