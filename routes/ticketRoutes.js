import  express from "express";
import { createTicket } from "../controllers/ticketController.js" 

const ticketRouter = express.Router();

ticketRouter
    .post("/", createTicket)

export default ticketRouter;