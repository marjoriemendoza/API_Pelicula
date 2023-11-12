import {Response,Request} from 'express'
import { AppDataSource } from '../data-source'
import { Genero } from '../models/Genero'


const generoRepository = AppDataSource.getRepository(Genero)
class GeneroController{

static createGenero = async (req: Request, res: Response) => {
    const {type} = req.body
    try {

  const genero = new Genero()
   genero.type = type

await generoRepository.save(genero)
return res.json({
   ok:true,
   statusCode:200,
   message:"genero creado"
})
        
    } catch (error) {
       return res.json({
            ok: false,
            statusCode: 500,
            message: `Error = ${error}`
        })
    }

    }

  static getGeneros = async(req:Request,res:Response)=>{
    
    try {
        const genero= await generoRepository.find({where:{state:true}})
        return genero.length>0
        ? res.json({ok:true,genero}): res.json({ok:false,message:"not found"})
    } catch (error) {
        return res.json({
            ok: false,
            message: `Error = ${error}`
        })
    }
  }

  static BuscarGenero = async (req:Request,res:Response)=>{
    const id = parseInt(req.params.id)
    try {
        const genero= await generoRepository.findOne({where:{id,state:true}})
      return genero
      ? res.json({ok:true,genero}): res.json({ok:false,message:"not found"})
    } catch (error) {
        return res.json({
            ok: false,
            message: `Error = ${error}`
        })
    }
  }
  static DeleteGenero =async(req:Request,res:Response)=>{
         const id = parseInt(req.params.id)
    try {
        const genero= await generoRepository.findOne({where:{id,state:true}})
        //si el genero buscado es diferente a los que hay en la base de datos
        if(!genero){
          throw new Error("not found")
        }
        genero.state = false
        await generoRepository.save(genero)
        return res.json({ok:true,message:"genero eliminado"})
    } catch (error) {
         return res.json({
            ok: false,
            message: `Error = ${error}`
        })
    }
  }
  static UpdateGenero =async(req:Request,res:Response)=>{
    const id = parseInt(req.params.id)
    const {type,} = req.body
    let genero:Genero
    try {
      genero = await generoRepository.findOne({where:{id,state:true}})
      if(!genero){
        throw new Error("not found")
      }
      genero.type=type
      await generoRepository.save(genero)
      return genero
      ? res.json({ok:true,message:"actualizado"}): res.json({ok:false,message:"not found"})
    } catch (error) {
      return res.json({
        ok: false,
        statusCode:500,
        message: `Error = ${error}`
    })
    }

  }
}


export default GeneroController