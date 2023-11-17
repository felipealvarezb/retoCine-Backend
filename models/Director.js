import mongoose, { Schema } from 'mongoose';

const directorSchema = new mongoose.Schema({
    directorName: {
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

directorSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export const directorModel = mongoose.model('Director', directorSchema);