import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        maxlength: 50,
        required: true,
        trim: true
    },
    password: {
        type: String,
        maxlength: 100,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        maxlength: 10,
        required: true,
        trim: true
    },
    birthday: {
        type: Date,
        required: true,
    },
    tikets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
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

const subscriberSchema = new mongoose.Schema({
    ...userSchema.obj,
    points:{
        type: Number,
    }
});

export const userModel = mongoose.model('User', userSchema);
export const subscriberModel = mongoose.model('Subscriber', subscriberSchema);