import {} from "express";
import { Router } from "express";
import {} from "../controllers/movie.controller";
import RentMovieController from "../controllers/rentmovie.controller";

const router = Router();
const rentmovie = RentMovieController;
router.post("/", rentmovie.createRent);

 router.get("/", rentmovie.getRent)
 router.put("/:id", rentmovie.updateRentMovie);

// router.get("/genero/:id", movie.getMoviesGenero);
 router.get("/:id", rentmovie.getRentbyId);

// //router.get("/", movie.getMoviesByGenre)
router.delete("/:id", rentmovie.DeleteRentMovie);

export default router;