import  express from "express";
import { getCinemas, getCinemaById, createCinema, updateCinema, deleteCinema } from "../controllers/cinemaController.js";

const cinemaRouter = express.Router();

cinemaRouter
    .get("/", getCinemas)
    .get("/:id", getCinemaById)
    //.get("/:cinemaId/theaters", getTheatersByCinemaId)
    .put("/:id", updateCinema)
    .post("/", createCinema)
    .delete("/:id", deleteCinema)

export default cinemaRouter;