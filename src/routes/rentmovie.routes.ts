import {} from "express";
import { Router } from "express";
import {} from "../controllers/movie.controller";
import RentMovieController from "../controllers/rentmovie.controller";
// import { checkToken } from '../jwtvalidation/jwt.validation';
const router = Router();
const rentmovie = RentMovieController;
// router.post("/", rentmovie.createRent);

//  router.get("/", checkToken, rentmovie.getRent)
//  router.put("/:id", checkToken, rentmovie.updateRentMovie);

// // router.get("/genero/:id", movie.getMoviesGenero);
//  router.get("/:id", checkToken, rentmovie.getRentbyId);

// // //router.get("/", movie.getMoviesByGenre)
// router.delete("/:id", checkToken, rentmovie.DeleteRentMovie);
router.post("/", rentmovie.createRent);
router.get("/", rentmovie.listRent)
router.put("/:id", rentmovie.updateRentMovie)
router.get("/:id", rentmovie.getRentbyId)
 router.delete("/:id", rentmovie.DeleteRentMovie)

export default router;