import mongoose from "mongoose";

export const connectDB = (uri, dbName) => {
    return mongoose.connect(uri, {
        dbName: dbName,
    });
};