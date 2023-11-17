import { directorModel } from "../models/Director.js";

export const getDirectors = async (req, res) => {
    try {
        const directors = await directorModel.find();
        res.status(200).json(directors);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const getDirectorById = async (req, res) => {
    try {
        const { id } = req.params;
        const director = await directorModel.findById(id);
        if(!director){
            return res.status(404).json(`Director with ID: ${id} not found`);
        }
        res.status(200).json(director);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const createDirector = async (req, res) => {
    try {
        const director = await directorModel.create(req.body);
        res.status(201).json(director);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const updateDirector = async (req, res) => {
    try {
        const { id } = req.params;
        const director = await directorModel.findByIdAndUpdate(
            {_id:id},
            req.body,
            {new:true}
        );
        res.status(200).json(director);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


export const deleteDirector = async (req, res) => {
    try {
        const { id } = req.params;
        const director = await directorModel.findByIdAndDelete(id);
        if(!director){
            return res.status(404).json(`Director with ID: ${id} not found`);
        }
        res.status(200).json("Director succesfully removed");
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
