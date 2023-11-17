import express from "express";
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter
    .get("/", getCategories)
    .get("/:id", getCategoryById)
    .put("/:id", updateCategory)
    .post("/", createCategory)
    .delete("/:id", deleteCategory)

export default categoryRouter;