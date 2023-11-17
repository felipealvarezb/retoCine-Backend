import { actorModel } from "../models/Actor.js";

export const getActors = async (req, res) => {
    try {
        const actors = await actorModel.find();
        res.status(200).json(actors);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const getActorById = async (req, res) => {
    try {
        const { id } = req.params;
        const actor = await actorModel.findById(id);
        if(!actor){
            return res.status(404).json(`Actor with ID: ${id} not found`);
        }
        res.status(200).json(actor);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const createActor = async (req, res) => {
    try {
        const actor = await actorModel.create(req.body);
        res.status(201).json(actor);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const updateActor = async (req, res) => {
    try {
        const { id } = req.params;
        const actor = await actorModel.findByIdAndUpdate(
            {_id:id},
            req.body,
            {new:true}
        );
        res.status(200).json(actor);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


export const deleteActor = async (req, res) => {
    try {
        const { id } = req.params;
        const actor = await actorModel.findByIdAndDelete(id);
        if(!actor){
            return res.status(404).json(`Actor with ID: ${id} not found`);
        }
        res.status(200).json("Actor succesfully removed");
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
