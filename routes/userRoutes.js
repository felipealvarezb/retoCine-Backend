import  express from "express";
import { getUsers, getUserById, getTicketsByUSerId, createTicket, registerUser, updateUser, deleteUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter
    .get("/", getUsers)
    .get("/:id", getUserById)
    .get("/:userId/tickets", getTicketsByUSerId)
    .put("/:id", updateUser)
    .post("/", registerUser)
    .post("/tickets", createTicket)
    .delete("/:id", deleteUser)

export default userRouter;
