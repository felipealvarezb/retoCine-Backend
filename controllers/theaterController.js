import { theaterModel } from "../models/Theater.js";

export const getTheaters = async (req, res) => {
    try {
        const theaters = await theaterModel.find();
        res.status(200).json(theaters);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const getTheaterById = async (req, res) => {
    try {
        const { id } = req.params;
        const theater = await theaterModel.findById(id);
        if(!theater){
            return res.status(404).json(`Theater with ID: ${id} not found`);
        }
        res.status(200).json(theater);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const createTheater = async (req, res) => {
    try {
        const theater = await theaterModel.create(req.body);
        res.status(201).json(theater);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const updateTheater = async (req, res) => {
    try {
        const { id } = req.params;
        const theater = await theaterModel.findByIdAndUpdate(
            {_id:id},
            req.body,
            {new:true}
        );
        res.status(200).json(theater);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const deleteTheater = async (req, res) => {
    try {
        const { id } = req.params;
        const theater = await theaterModel.findByIdAndDelete(id);
        if(!theater){
            return res.status(404).json(`Theater with ID: ${id} not found`);
        }
        res.status(200).json("Theater succesfully removed");
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}