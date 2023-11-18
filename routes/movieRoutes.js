import  express from "express";
import { getMovies, 
    getMovieById, 
    getMoviesByCategoryId,
    getMoviesByActorId,
    getMoviesByDirectorId,
    createMovie, 
    updateMovie, 
    deleteMovie} 
    from "../controllers/movieController.js";
import { upload } from './../middleware/Storage.js'

const movieRouter = express.Router();

movieRouter
    .get("/", getMovies)
    .get("/:id", getMovieById)
    .get("/category/:categoryId", getMoviesByCategoryId)
    .get("/actor/:actorId", getMoviesByActorId)
    .get("/director/:directorId", getMoviesByDirectorId)
    .put("/:id", upload.single('image'), updateMovie)
    .post("/", upload.single('image'), createMovie)
    .delete("/:id", deleteMovie)

export default movieRouter;