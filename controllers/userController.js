import bcrypt from 'bcrypt';
import { movieModel } from "../models/Movie.js";
import { ticketModel } from "../models/Ticket.js";
import { userModel } from "../models/User.js";


export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if(!user){
            return res.status(404).json(`User with ID: ${id} not found`);
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const getTicketsByUSerId = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userModel.findById(userId);
        user.tikets = await ticketModel.find({ userId: userId });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

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

export const registerUser = async (req, res) => {
    try {
        const { email, password, phone, birthday } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            email,
            password: hash,
            phone,
            birthday
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const authenticateUser = async (req, res) => {
    try {
        const user = await userModel.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findByIdAndUpdate(
            {_id:id},
            req.body,
            {new:true}
        );
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findByIdAndDelete(id);
        res.status(200).json("User succesfully removed");
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}