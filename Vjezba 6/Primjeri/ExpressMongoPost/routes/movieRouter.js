import express from "express"
import mongoose from "mongoose"
import { Movie } from "../models/MovieModel.js";
const movieRouter = express.Router();


const routes = ()=>{
    
    movieRouter.route('/movies')
    .post((req, res)=>{
        const movie = new Movie(req.body);
        console.log(req.body)
        console.log(movie)
        movie.save()
        return res.status(210).json(movie)
    })
    .get((req, res)=>{
        //const query = {genre:"Comedy"}
        Movie.find((err, movies)=>{
            if(err){
                console.log(err)
            }
            else{
                res.json(movies)
            }
        })
    })

    movieRouter.route('/movies/:movieId')
    .get((req, res)=>{
        Movie.findById({id:req.params.movieId}, (err, movie)=>{
            if(err){
                console.log(err)
                return res.send(err);
            }
            else{
                console.log(movie)
                return res.status(210).json(movie)
            }
        })

    })

    return movieRouter

}

export default routes;