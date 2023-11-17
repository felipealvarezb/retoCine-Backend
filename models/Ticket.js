import mongoose, { Schema } from 'mongoose';
import { movieModel } from './Movie.js';

const ticketSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    }
});

ticketSchema.pre('save', async function (next) {
    try {
        const movie = await movieModel.findById(this.movieId);
        if (!movie) {
            throw new Error("Movie not found");
        }

        this.totalPrice = movie.price * this.quantity;
        this.updatedAt = Date.now();
        next();
    } catch (error) {
        next(error);
    }
});

export const ticketModel = mongoose.model('Ticket', ticketSchema);