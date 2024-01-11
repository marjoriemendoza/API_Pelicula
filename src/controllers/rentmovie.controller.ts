import { Cliente } from './../models/Cliente';
import { AppDataSource } from './../data-source';
import { RentMovie } from "../models/RentMovie.1";
import { Request, Response } from "express";
import { Movie } from "../models/Movie.1";
import ClienteController from "../controllers/cliente.controller"
import { ok } from "assert";
import { paginate } from '../pagination';
const rentmovieRepository = AppDataSource.getRepository(RentMovie);


class RentMovieController{
    static createRent = async (req: Request, res: Response) => {
      const { id_movie, id_costumer, loan_date, devolution_date, price, amount, subTotal, total, } = req.body;
      const clienteRepository = AppDataSource.getRepository(Cliente)


    try {
      const rent = new RentMovie();
        rent.movie = id_movie
        rent.cliente = id_costumer;
        rent.loan_date = loan_date;
        rent.devolution_date = devolution_date;
        rent.amount = amount;
        rent.price = price;        
        rent.subTotal= subTotal;
        rent.total = total;

        let st = price * amount;
        rent.subTotal = st;
        rent.total = parseFloat((rent.subTotal).toFixed(2)) 
        let disc1 = subTotal * 0.15;    
        const client_f = await clienteRepository.findOne({where: {id: id_costumer}})
        if (client_f.points>=10 && client_f.points<20) {
          client_f.points = client_f.points + rent.amount
          rent.total=parseFloat((rent.subTotal - (rent.subTotal * 0.10)).toFixed(2));
          
          await rentmovieRepository.save(rent);
          clienteRepository.save(client_f)
          return res.json({ ok: true,  message: "poins are 10 or more get a 15% discount rent was creaetd", });  
        }else if (client_f.points>=20) {
          client_f.points = client_f.points + rent.amount
          rent.total= rent.subTotal - (rent.subTotal*0.20)
          await rentmovieRepository.save(rent);
          clienteRepository.save(client_f)
          return res.json({ ok: true,  message: "poins are 20 or more get a 20% discount rent was creaetd", });
        }else{
          client_f.points = client_f.points + rent.amount
        
          await rentmovieRepository.save(rent);
          clienteRepository.save(client_f)
          return res.json({ ok: true,  message: " rent was creaetd", }); 
        }
      
      
    } catch (error) {
      return res.json({ok: false,message: `error that movie does not exist = ${error.message}`,});
    }
  };


  // static getRent = async (req: Request, res: Response) => {   
  //   try {
  //     const page = parseInt(req.query.page as string) || 1;
  //     const perPage = parseInt(req.query.per_page as string) || 10;

  //     const paginatedResult = await paginate(rentmovieRepository, page, perPage, { state: true });

  //     return paginatedResult.data.length > 0
  //       ? res.json({ ...paginatedResult, ok: true })
  //       : res.json({ ok: false, message: 'Not found' });
  //   } catch (error) {
  //     return res.json({
  //       ok: false,
  //       message: `error = ${error.message}`,
  //     });
  //   }
  // };

  static listRent = async(req:Request, resp:Response)=>{
     const movie = req.query.movie || ""
     const id_movie = req.query.id_movie || ""
     const cliente =req.query.id_costumer || ""
     const id_costumer = req.query.id_costumer || ""
    
    try{
      const rentmovie = await rentmovieRepository.find({
        where:{
          state:true
        },
        relations:{
          movie:true,
          cliente: true
        }
        
      })
      return rentmovie.length> 0
      ?resp.json({
        ok:true,
        rentmovie
      })
      :resp.json({
        ok:false,
        msg: 'Not found',
      })
      
     } catch(error){
      ok:false
      Status_Code: 500
      msg: `error = ${error}`
     }
  } 

  static getRentbyId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const generoId = req.query.generoId || "";

    try {
      const movie = await rentmovieRepository.findOne({
        where: {
          id,
          state: true,
          
        },
        relations: {movie: true}, 
      });

      return movie
        ? res.json({ ok: true, movie })
        : res.json({ ok: false, message: "tht rent id does not exist" });
    } catch (error) {
      return res.json({
        ok: false,
        message: `Error: ${error.message}`,
      });
    }
  };

  static updateRentMovie = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { id_movie, id_costumer, loan_date, devolution_date, price, amount, totalPrice } = req.body;
    let rentmovie: RentMovie;
    try {
      rentmovie = await rentmovieRepository.findOne({ where: { id, state: true } });
      
      rentmovie.movie = id_movie;
      rentmovie.cliente = id_costumer;
      rentmovie.loan_date = loan_date;
      rentmovie.devolution_date = devolution_date
      rentmovie.price = price
      rentmovie.amount = amount
      
      await rentmovieRepository.save(rentmovie);

      return rentmovie
        ? res.json({ ok: true, rentmovie: "renta actualizada"})
        : res.json({ ok: false, message: "there's nothig here pal" });
    } catch (error) {
      return res.json({
        ok: false,
        STATUS_CODE: 500,
        message: `error = ${error.message}`,
      });
    }
  };

  static DeleteRentMovie = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
      const rentmovie = await rentmovieRepository.findOne({
        where: { id, state: true },
      });
      if (!rentmovie) {
        throw new Error("not found");
      }
      rentmovie.state = false;
      await rentmovieRepository.save(rentmovie);

      return res.json({ok:true,message:"renta eliminada"})
    } catch (error) {
         return res.json({
            ok: false,
            message: `Error = ${error}`
        })
    }
  };


}



export default RentMovieController