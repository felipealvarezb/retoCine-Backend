import  express from "express";
import { getDirectors, getDirectorById, createDirector, updateDirector, deleteDirector } from "../controllers/directorController.js";

const directorRouter = express.Router();

directorRouter
    .get("/", getDirectors)
    .get("/:id", getDirectorById)
    .put("/:id", updateDirector)
    .post("/", createDirector)
    .delete("/:id", deleteDirector)

export default directorRouter;