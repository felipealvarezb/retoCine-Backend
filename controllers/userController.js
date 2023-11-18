import { movieModel } from "../models/Movie.js";
import { ticketModel } from "../models/Ticket.js";
import { userModel, subscriberModel } from "../models/User.js";
import { generateToken, comparePassword } from '../middleware/Auth.js';

import bcrypt from 'bcrypt';

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
        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new userModel({ 
            email, 
            password:hashedPassword, 
            phone, 
            birthday });
        await user.save();

        res.status(201).json({ success: true, message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al registrar el usuario' });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
        }

        const passwordMatch = await comparePassword(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Contraseña invalida' });
        }

        const token = generateToken(user);
        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al iniciar sesión' });
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