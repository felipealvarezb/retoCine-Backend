import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        maxlength: 50,
        required: true,
        uppercase: true,
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

categorySchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export const categoryModel = mongoose.model('Category', categorySchema);
