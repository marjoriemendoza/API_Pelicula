import {} from "express";
import { Router } from "express";
import {} from "../controllers/movie.controller";
import MovieController from "../controllers/movie.controller";
// import { checkToken } from '../jwtvalidation/jwt.validation';
const router = Router();
const movie = MovieController;

router.post("/create", movie.createMovie);

//router.get("/",  movie.getMovies)
router.get("/",  movie.ListMovies)
router.get("/genero/:id", movie.getMoviesGenero);
router.get("/:id",  movie.getMoviesbyId);

//router.get("/", movie.getMoviesByGenre)
router.delete("/:id",  movie.DeleteMovie);
router.put("/:id", movie.updateMovie);


export default router;
