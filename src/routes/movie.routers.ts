import {} from "express";
import { Router } from "express";
import {} from "../controllers/movie.controller";
import MovieController from "../controllers/movie.controller";
import { checkToken } from '../jwtvalidation/jwt.validation';
const router = Router();
const movie = MovieController;
router.post("/", movie.createMovie);

router.get("/", checkToken, movie.getMovies)
router.get("/genero/:id", checkToken, movie.getMoviesGenero);
router.get("/:id", checkToken, movie.getMoviesbyId);

//router.get("/", movie.getMoviesByGenre)
router.delete("/:id", checkToken, movie.DeleteMovie);
router.put("/:id", checkToken, movie.updateMovie);

export default router;
