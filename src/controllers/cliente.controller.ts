
import {Response,Request} from 'express'
import { AppDataSource } from '../data-source'
import { Cliente } from '../models/Cliente'


const clienteRepository = AppDataSource.getRepository(Cliente)
class ClienteController{

static createCliente = async (req: Request, res: Response) => {
    const {name,lastName,age,phone,} = req.body
    try {

  const cliente = new Cliente()
   cliente.name = name;
   cliente.lastName = lastName;
   cliente.phone=phone;
   cliente.age=age;
   

await clienteRepository.save(cliente)
return res.json({
   ok:true,
   statusCode:200,
   message:"cliente creado"
})
        
    } catch (error) {
       return res.json({
            ok: false,
            statusCode: 500,
            message: `Error = ${error}`
        })
    }

    }

  static getClientes = async(req:Request,res:Response)=>{
    
    try {
        const cliente= await clienteRepository.find({where:{state:true}})
        return cliente.length>0
        ? res.json({ok:true,cliente}): res.json({ok:false,message:"not found"})
    } catch (error) {
        return res.json({
            ok: false,
            message: `Error = ${error}`
        })
    }
  }

  static BuscarCliente = async (req:Request,res:Response)=>{
    const id = parseInt(req.params.id)
    try {
        const cliente= await clienteRepository.findOne({where:{id,state:true}})
      return cliente
      ? res.json({ok:true,cliente}): res.json({ok:false,message:"not found"})
    } catch (error) {
        return res.json({
            ok: false,
            message: `Error = ${error}`
        })
    }
  }
  static DeleteCliente =async(req:Request,res:Response)=>{
         const id = parseInt(req.params.id)
    try {
        const cliente= await clienteRepository.findOne({where:{id,state:true}})
        //si el genero buscado es diferente a los que hay en la base de datos
        if(!cliente){
          throw new Error("not found")
        }
        cliente.state = false
        await clienteRepository.save(cliente)
        return res.json({ok:true,message:"eliminado"})
    } catch (error) {
         return res.json({
            ok: false,
            message: `Error = ${error}`
        })
    }
  }
  public static UpdateCliente =async(req:Request,res:Response)=>{
    const id = parseInt(req.params.id)
    const {name,lastName,age,phone,} = req.body
    let cliente:Cliente
    try {
      cliente = await clienteRepository.findOne({where:{id,state:true}})
      if(!name){
        throw new Error("not found")
      }
      cliente.name = name;
      cliente.lastName = lastName;
      cliente.phone=phone;
      cliente.age=age;
      

      await clienteRepository.save(cliente)
      return cliente
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


export default ClienteController