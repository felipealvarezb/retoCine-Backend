import  express from "express";
import { getDirectors, getDirectorById, createDirector, updateDirector, deleteDirector } from "../controllers/directorController.js";
import { authenticateToken } from "../middleware/Auth.js";

const directorRouter = express.Router();

directorRouter
    .get("/", getDirectors)
    .get("/:id", getDirectorById)
    .put("/:id", updateDirector)
    .post("/", createDirector)
    .delete("/:id", deleteDirector)

export default directorRouter;