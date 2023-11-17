import mongoose, { Schema } from 'mongoose';

const offerSchema = new mongoose.Schema({
    description: {
        type: String,
        maxlength: 250,
        required: true,
        trim: true
    },
    deadline: {
        type: Date,
        required: true,
        trim: true
    },
    addPoints: {
        type: Number,
        required: true
    },
    cinemaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cinema",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
      updatedAt: {
        type: Date,
        default: Date.now,
    },
});

offerSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export const offerModel = mongoose.model('Offer', offerSchema);