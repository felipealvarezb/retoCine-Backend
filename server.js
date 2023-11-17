import express from "express";
import dotenv from 'dotenv';
import passport from "passport";
import cors from 'cors';
import multer from "multer";

import { connectDB } from "./config/db.js";
import movieRouter from "./routes/movieRoutes.js";
import actorRouter from "./routes/actorRoutes.js";
import directorRouter from "./routes/directorRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import cinemaRouter from "./routes/cinemaRoutes.js";
import theaterRouter from "./routes/theaterRoutes.js";
import offerRouter from "./routes/offerRoutes.js";
import userRouter from "./routes/userRoutes.js";
import ticketRouter from "./routes/ticketRoutes.js";


const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
//app.use(passport.initialize());
//app.use(passport.session());

app.use("/api/movies", movieRouter);
app.use("/api/actors", actorRouter);
app.use("/api/directors", directorRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/cinemas", cinemaRouter);
app.use("/api/theaters", theaterRouter);
app.use("/api/offers", offerRouter);
app.use("/api/users", userRouter);
app.use("/api/tickets", ticketRouter);




const PORT = process.env.PORT; 
const MONGO_URI = process.env.MONGO_URI;
const MONGO_DBNAME = process.env.MONGO_DBNAME;

app.get("/", (req, res) => {
    res.send("Hola mundo");
})

const start = async() => {
    try{
        await connectDB(MONGO_URI, MONGO_DBNAME);
        console.log("Mongodb connection established");
        app.listen(PORT, () => {
            console.log(`Server running http://localhost:${PORT}`);
        })
    } catch(error){
        console.log(error);
    }
}

start();