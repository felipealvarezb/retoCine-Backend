import  express from "express";
import { getTheaters, getTheaterById, createTheater, updateTheater, deleteTheater } from "../controllers/theaterController.js" 

const theaterRouter = express.Router();

theaterRouter
    .get("/", getTheaters)
    .get("/:id", getTheaterById)
    .put("/:id", updateTheater)
    .post("/", createTheater)
    .delete("/:id", deleteTheater)

export default theaterRouter;