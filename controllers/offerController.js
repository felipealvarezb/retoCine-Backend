import { offerModel } from "../models/Offer.js";

export const getOffers = async (req, res) => {
    try {
        const offers = await offerModel.find();
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const getOfferById = async (req, res) => {
    try {
        const { id } = req.params;
        const offer = await offerModel.findById(id);
        if(!offer){
            return res.status(404).json(`Offer with ID: ${id} not found`);
        }
        res.status(200).json(offer);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const createOffer = async (req, res) => {
    try {
        const offer = await offerModel.create(req.body);
        res.status(201).json(offer);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const updateOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const offer = await offerModel.findByIdAndUpdate(
            {_id:id},
            req.body,
            {new:true}
        );
        if(!offer){
            return res.status(404).json(`Offer with ID: ${id} not found`);
        }
        res.status(200).json(offer);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const deleteOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const offer = await offerModel.findByIdAndDelete(id);
        if(!offer){
            return res.status(404).json(`Offer with ID: ${id} not found`);
        }
        res.status(200).json("Offer succesfully removed");
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
