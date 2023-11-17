import  express from "express";
import { getActors, getActorById, createActor, updateActor, deleteActor } from "../controllers/actorController.js";

const actorRouter = express.Router();

actorRouter
    .get("/", getActors)
    .get("/:id", getActorById)
    .put("/:id", updateActor)
    .post("/", createActor)
    .delete("/:id", deleteActor)

export default actorRouter;