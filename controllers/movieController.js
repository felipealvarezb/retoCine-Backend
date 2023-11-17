import { movieModel } from "../models/Movie.js";
import { directorModel } from "../models/Director.js";
import { categoryModel } from "../models/Category.js";
import { actorModel } from "../models/Actor.js";

export const getMovies = async (req, res) => {
    try {
        const movies = await movieModel.find();
        res.status(200).json(movies);
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await movieModel.findById(id);
        if(!movie){
            return res.status(404).json(`Movie with ID: ${id} not found`);
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


export const getMoviesByCategoryId = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category = await categoryModel.findById(categoryId);
        category.movies = await movieModel.find({ categories:categoryId });
        if(!category){
            return res.status(404).json(`Category with ID: ${id} not found`);
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


export const getMoviesByActorId = async (req, res) => {
    try {
        const { actorId } = req.params;
        const actor = await actorModel.findById(actorId);
        actor.movies = await movieModel.find({ actors:actorId })
        if(!actor){
            return res.status(404).json(`Actor with ID: ${id} not found`);
        }
        res.status(200).json(actor);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const getMoviesByDirectorId = async (req, res) => {
    try {
        const { directorId } = req.params;
        const director = await directorModel.findById(directorId);
        director.movies = await movieModel.find({ directors:directorId });
        if(!director){
            return res.status(404).json(`Director with ID: ${id} not found`);
        }
        res.status(200).json(director);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const createMovie = async (req, res) => {
    try {
        const newMovie = new movieModel({
            title:req.body.title,
            description:req.body.description,
            image:'/uploads/'+req.file.filename,
            year:req.body.year,
            movieDate:req.body.movieDate,
            price:req.body.price,
            theater:req.body.theater,
            categories:req.body.categories,
            actors:req.body.actors,
            directors:req.body.directors,

        })
        const savedMovie = newMovie.save();
        console.log(savedMovie);
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await movieModel.findByIdAndUpdate(
            {_id: id},
            req.body,
            {new:true}
        );
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await movieModel.findByIdAndDelete(id);
        if(!movie){
            return res.status(404).json(`Movie with ID: ${id} not found`);
        }
        res.status(200).json("Movie succesfully removed");
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}