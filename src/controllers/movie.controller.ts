import { Movie } from './../models/Movie.1';
import { Genero } from './../models/Genero';
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";

import { getRepository, Like } from 'typeorm';
const movieRepository = AppDataSource.getRepository(Movie);

class MovieController {
  static createMovie = async (req: Request, res: Response) => {
    const { title, duration, director, language, image, ranking, genero } = req.body;
    try {
      const movie = new Movie();
      movie.title = title;    
      movie.duration = duration;
      movie.director = director;
      movie.language = language;
      movie.image = image;
      movie.ranking = ranking;
      movie.genero= genero;
      
     
      await movieRepository.save(movie);
      return res.json({
        ok: true,
        message: "Movie was created",
      });
    } catch (error) {
      return res.json({
        ok: false,
        message: `error = ${error.message}`,
      });
    }
  };

  static getMovies = async (req: Request, res: Response) => {
    const title = req.query.title || "";
    
    const genero = req.query.genero || ""
    const generoId = req.query.generoId || ""
    const repoMovie = AppDataSource.getRepository(Movie)

    
    try {
      const movie = await movieRepository.find({ 
        where :    { 
          state: true,
          title:Like(`%${title}%`), 
          genero: {type: Like(`%${genero}%`)},
        },
      relations: {genero:true},
    
    });
      return movie.length > 0
        ? res.json({ ok: true, movie })
        : res.json({ ok: false, message: "there's nothig here fool" });
    } catch (error) {
      return res.json({
        ok: false,
        message: `error = ${error.message}`,
      });
    }
  };

  static getMoviesGenero = async (req: Request, res: Response) => {
    const generoId = Number(req.params.id) || 0;   
   
    const repoMovie = AppDataSource.getRepository(Movie)  
    try {
      const movie = await movieRepository.find({ 
        where :    { 
          state: true,
        
          genero: {id:generoId},
        },
      relations: {genero:true},
    
    });
      return movie.length > 0
        ? res.json({ ok: true, movie })
        : res.json({ ok: false, message: "there's nothig here fool" });
    } catch (error) {
      return res.json({
        ok: false,
        message: `error = ${error.message}`,
      });
    }
  };








  static getMoviesbyId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const generoId = req.query.generoId || "";

    try {
      const movie = await movieRepository.findOne({
        where: {
          id,
          state: true,
          
        },
        relations: {genero: true}, 
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

  



  static DeleteMovie = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
      const movie = await movieRepository.findOne({
        where: { id, state: true },
      });
      if (!movie) {
        throw new Error("not found");
      }
      movie.state = false;
      await movieRepository.save(movie);

      return res.json({ok:true,message:"pelicula eliminada"})
    } catch (error) {
         return res.json({
            ok: false,
            message: `Error = ${error}`
        })
    }
  };

  static updateMovie = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { title, duration, director, language, image, ranking, genero  } = req.body;
    let movie: Movie;
    try {
      movie = await movieRepository.findOne({ where: { id, state: true } });
      if (!title) {
        throw new Error("not found");
      }
      movie.title = title;    
      movie.duration = duration;
      movie.director = director;
      movie.language = language;
      movie.image = image;
      movie.ranking = ranking;
      movie.genero= genero;
      await movieRepository.save(movie);

      return movie
        ? res.json({ ok: true, movie })
        : res.json({ ok: false, message: "there's nothig here pal" });
    } catch (error) {
      return res.json({
        ok: false,
        STATUS_CODE: 500,
        message: `error = ${error.message}`,
      });
    }
  };
}

export default MovieController;
