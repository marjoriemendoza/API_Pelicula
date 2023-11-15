import {} from "express";
import { Router } from "express";
import {} from "../controllers/movie.controller";
import MovieController from "../controllers/movie.controller";

const router = Router();
const movie = MovieController;
router.post("/", movie.createMovie);

router.get("/", movie.getMovies)
router.get("/genero/:id", movie.getMoviesGenero);
router.get("/:id", movie.getMoviesbyId);

//router.get("/", movie.getMoviesByGenre)
router.delete("/:id", movie.DeleteMovie);
router.put("/:id", movie.updateMovie);

export default router;
