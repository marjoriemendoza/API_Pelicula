import {} from "express";
import { Router } from "express";
import {} from "../controllers/movie.controller";
import RentMovieController from "../controllers/rentmovie.controller";
import { checkToken } from '../jwtvalidation/jwt.validation';
const router = Router();
const rentmovie = RentMovieController;
router.post("/", rentmovie.createRent);

 router.get("/", checkToken, rentmovie.getRent)
 router.put("/:id", checkToken, rentmovie.updateRentMovie);

// router.get("/genero/:id", movie.getMoviesGenero);
 router.get("/:id", checkToken, rentmovie.getRentbyId);

// //router.get("/", movie.getMoviesByGenre)
router.delete("/:id", checkToken, rentmovie.DeleteRentMovie);

export default router;