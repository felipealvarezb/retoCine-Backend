import  express from "express";
import { getUsers, getUserById, getTicketsByUSerId, createTicket, registerUser, loginUser, updateUser, deleteUser } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/Auth.js";

const userRouter = express.Router();

userRouter
    .get("/", getUsers)
    .get("/:id", getUserById)
    .get("/:userId/tickets", getTicketsByUSerId)
    .get("/protected", authenticateToken, (req, res) => {
        res.json({ success: true, message: '¡Has accedido a una ruta protegida!' });
    })
    .put("/:id", updateUser)
    .post("/register", registerUser)
    .post("/login", loginUser)
    .post("/tickets", createTicket)
    .delete("/:id", deleteUser)

export default userRouter;
