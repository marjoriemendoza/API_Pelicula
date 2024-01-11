import routes, {} from "../routes/index.routes"
import morgan from "morgan";
import express,{Application} from "express";
import cors from "cors"

class Server{
    private app:Application

    //puerto de respaldo
    public static readonly PORT:number=3000
    public port: string | number
    constructor(){
    this.app=express()
    this.middlewares()

    }
    middlewares(){
        this.app.use(
            cors({
                origin:["http://localhost:5173","http://localhost:5174"],
                credentials:true       })
        )
        this.app.use(morgan('dev')),
        this.app.use(express.json({limit:'50mb'})),
        this.app.use(express.urlencoded({extended:true,limit:'50mb'}))
        this.app.use('/',routes)
    }
    listen(){
        this.app.listen((this.port=process.env.PORT||Server.PORT),()=>{

          console.log(`Server is running in port${this.port}`)
        });
    } 
    
    }
    export default Server
    