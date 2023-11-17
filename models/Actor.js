import mongoose, { Schema } from 'mongoose';

const actorSchema = new mongoose.Schema({
    actorName: {
        type: String,
        maxlength: 50,
        required: true,
        trim: true
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
    },
});

actorSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export const actorModel = mongoose.model('Actor', actorSchema);