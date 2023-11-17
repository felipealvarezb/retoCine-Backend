import mongoose from "mongoose";
import { categoryModel } from "../models/Category.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message:error.message});
    }

}

export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findById(id);
        if(!category){
            return res.status(404).json(`Category with ID: ${id} not found`);
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({message:error.message});
    }

}


export const createCategory = async (req, res) => {
    try {
        const category = await categoryModel.create({
            _id: new mongoose.Types.ObjectId,
            ...req.body
        });
        console.log("PASAMOS POR AQUI");
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(
            {_id:id},
            req.body,
            {new:true}
        );
        if(!category){
            return res.status(404).json(`Category with ID: ${id} not found`);
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findByIdAndDelete(id);
        if(!category){
            return res.status(404).json(`Category with ID: ${id} not found`);
        }
        res.status(200).json("Category succesfully removed");
    } catch (error) {
        res.status(500).json({message:error.message});
    }

}