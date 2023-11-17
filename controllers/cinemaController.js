import { cinemaModel } from "../models/Cinema.js";
import { offerModel } from "../models/Offer.js";
import { theaterModel } from "../models/Theater.js";

export const getCinemas = async (req, res) => {
    try {
        const cinemas = await cinemaModel.find();
        res.status(200).json(cinemas);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const getCinemaById = async (req, res) => {
    try {
        const { id } = req.params;
        const cinema = await cinemaModel.findById(id);
        cinema.theaters = await theaterModel.find({ cinemaId:id });
        cinema.offers = await offerModel.find({ cinemaId:id });
        if(!cinema){
            return res.status(404).json(`Cinema with ID: ${id} not found`);
        }
        res.status(200).json(cinema);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const createCinema = async (req, res) => {
    try {
        const cinema = await cinemaModel.create(req.body);
        res.status(201).json(cinema);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const updateCinema = async (req, res) => {
    try {
        const { id } = req.params;
        const cinema = await cinemaModel.findByIdAndUpdate(
            {_id:id},
            req.body,
            {new:true}
        );
        res.status(200).json(cinema);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const deleteCinema = async (req, res) => {
    try {
        const { id } = req.params;
        const cinema = await cinemaModel.findByIdAndDelete(id);
        if(!cinema){
            return res.status(404).json(`Cinema with ID: ${id} not found`);
        }
        res.status(200).json("Cinema succesfully removed");
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
