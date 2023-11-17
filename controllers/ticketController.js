import { movieModel } from "../models/Movie.js";
import { ticketModel } from "../models/Ticket.js";
import { userModel } from "../models/User.js";

export const createTicket = async (req, res) => {
    try {
        const movie = await movieModel.findById(req.body.movieId);
        const user = await userModel.findById(req.body.userId);
        if (!movie || !user) {
            return res.status(404).json({ error: 'Movie or user not found' });
        }
        const newTicket = new ticketModel({
            movieId: req.body.movieId,
            userId: req.body.userId,
            quantity: req.body.quantity,
        });
        const savedTicket = await newTicket.save();
        res.json(savedTicket);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}