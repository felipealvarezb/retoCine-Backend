import mongoose, { Schema } from 'mongoose';

const theaterSchema = new mongoose.Schema({
    theaterNumber: {
        type: Number,
        required: true,
        trim: true
    },
    capacity: {
        type: Number,
        required: true,
        trim: true
    },
    cinemaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cinema",
        required: true
    },
    movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

theaterSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export const theaterModel = mongoose.model('Theater', theaterSchema);