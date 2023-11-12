//host,puerto de base de datos,puerto,usuario
import { DataSource } from "typeorm";

export const AppDataSource=new DataSource({
    type:'mysql',
    host:'localhost',
    username:'root',
    password:'_Mendoza04',
    port:3309,
    database:'pelicula_api',
    synchronize:true,
    logging:true,
    entities:['dist/models/**/*.js'],
    subscribers:['dist/subscribers/**/*.js'],
    migrations:['dist/migrations/**/*.js']
 })
