import mongoose from "mongoose";

const cinemaSchema = new mongoose.Schema({
    cinemaName: {
        type: String,
        maxlength: 50,
        required: true,
        uppercase: true,
        trim: true
    },
    city: {
        type: String,
        maxlength: 50,
        required: true,
        uppercase: true,
        trim: true
    },
    address: {
        type: String,
        maxlength: 50,
        required: true,
        uppercase: true,
        trim: true
    },
    theaters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theater"
    }],
    offers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer"
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

cinemaSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export const cinemaModel = mongoose.model('Cinema', cinemaSchema);