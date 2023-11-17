import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 100,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        maxlength: 500,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        trim: true
    },
    year: {
        type: Date,
        required: true
    },
    movieDate:{
        type: Date,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    theater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theater",
        required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }],
    actors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Actor",
        required: true
    }],
    directors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Director",
        required: true
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
      updatedAt: {
        type: Date,
        default: Date.now,
    },
});

movieSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export const movieModel = mongoose.model('Movie', movieSchema);
