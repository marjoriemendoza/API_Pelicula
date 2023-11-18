import { Cliente } from './../models/Cliente';
import { AppDataSource } from './../data-source';
import { RentMovie } from "../models/RentMovie.1";
import { getConnection } from 'typeorm';
import { Request, Response } from "express";
import { Movie } from "../models/Movie.1";
import ClienteController from "../controllers/cliente.controller"
import { ok } from "assert";
const rentmovieRepository = AppDataSource.getRepository(RentMovie);


class RentMovieController{
    static createRent = async (req: Request, res: Response) => {
      const { id_movie, id_costumer, loan_date, devolution_date, price, amount, subTotal, total, points} = req.body;
      const clienteRepository = AppDataSource.getRepository(Cliente)

    try {
      const rent = new RentMovie();
      rent.movie = id_movie;
      rent.cliente = id_costumer;
      rent.loan_date = loan_date;
      rent.devolution_date = devolution_date;
      rent.price = price;
      rent.amount = amount;
      rent.subTotal= price*amount;
      rent.total = total;

      const client = new Cliente();

      const client_f = await clienteRepository.findOne({where: {id: id_costumer}})
      
      if(client_f){
        client_f.points = client_f.points+1

        clienteRepository.save(client_f)
      }

       

      let discount1 = 0.15*price
      let discount2= 0.20 * price  

      await rentmovieRepository.save(rent);

      return res.json({ ok: true,  message: "Rent was created", });
    } catch (error) {
      return res.json({ok: false,message: `error that movie does not exist = ${error.message}`,});
    }
  };


  static getRent = async (req: Request, res: Response) => {
    // const title = req.query.title || "";
    
    // const genero = req.query.genero || ""
    // const generoId = req.query.generoId || ""
    // const repoMovie = AppDataSource.getRepository(Movie)

    
    try {
      const rentmovie = await rentmovieRepository.find({ 
        where :    { 
          state: true,
          
          
        },
    
    
    });
      return rentmovie.length > 0
        ? res.json({ ok: true, rentmovie })
        : res.json({ ok: false, message: "there's nothig here fool" });
    } catch (error) {
      return res.json({
        ok: false,
        message: `error = ${error.message}`,
      });
    }
  };

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
        : res.json({ ok: false, message: "No hay nada aquí, tonto" });
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
      if (!id) {
        throw new Error("not found");
      }
      const rent = new RentMovie();
      rentmovie.movie = id_movie;
      rentmovie.id_costumer = id_costumer;
      rentmovie.loan_date = loan_date;
      rentmovie.devolution_date = devolution_date
      rentmovie.price = price
      rent.amount = amount
      
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