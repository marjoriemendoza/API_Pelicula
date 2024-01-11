import {} from "express";
import { Router } from "express";
import {} from "../controllers/movie.controller";
import MovieController from "../controllers/movie.controller";
import { checkToken } from '../jwtvalidation/jwt.validation';
const router = Router();
const movie = MovieController;

// router.get("/", checkToken, movie.getMovies)
// router.get("/genero/:id", checkToken, movie.getMoviesGenero);
// router.get("/:id", checkToken, movie.getMoviesbyId);
// router.delete("/:id", checkToken, movie.DeleteMovie);
// router.put("/:id", checkToken, movie.updateMovie);

router.get("/",  movie.getMovies)
router.post("/", movie.createMovie);
router.get("/genero/:id",  movie.getMoviesGenero);
router.get("/:id",  movie.getMoviesbyId);
router.delete("/:id",  movie.DeleteMovie);
router.put("/:id",  movie.updateMovie);

export default router;
