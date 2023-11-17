import express from "express";
import { getOffers, getOfferById, createOffer, updateOffer, deleteOffer } from "../controllers/offerController.js";

const offerRouter = express.Router();

offerRouter
    .get("/", getOffers)
    .get("/:id", getOfferById)
    .put("/:id", updateOffer)
    .post("/", createOffer)
    .delete("/:id", deleteOffer)

export default offerRouter;
