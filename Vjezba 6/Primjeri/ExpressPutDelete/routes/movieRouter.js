import express from "express"
import moongose from "mongoose"
import {Movie} from "../models/MovieModel.js"
const movieRouter = express.Router()

const myRouter = () =>{

    /*movieRouter.use('/movies/:movieId', (req, res, next)=>{
        Movie.findById(req.params.movieId, (err, movie)=>{ // ovo treba provjeriti kako radi- middleware-i
            if(err){
                return res.status(404).send(err);
            }
            if(movie){
                req.movie = movie;
                return next();
            }
            return res.sendStatus(404);
        })
    })
     */

    movieRouter.route('/movies/update')
    .put((req, res)=>{       
        console.log(req.body.name) 
        Movie.updateMany({name:req.body.name},{name:"Snatch2"},(err, movies)=>{
            if(err){
                res.send(err)
            }
            else{
                res.json(movies)
            }
        } )
    })

    movieRouter.route('/movies/deleteMany')
    .delete((req, res)=>{
        Movie.deleteMany({duration:{$gte: 100}}, (err, dataDeleted)=>{
            if(err){
                res.send(err)
            }
            else{
                res.json(dataDeleted)
            }
        })
    })

    movieRouter.route('/movies/:movieId')
    .get((req, res)=>{
        Movie.findById(req.params.movieId,(err, movie)=>{
            res.send(movie)
        })
    })
    .delete((req, res)=>{
        Movie.remove({_id:req.params.movieId}, (err, movie)=>{
            if(err){
                res.send(err)
            }
            else{
               
                res.json(movie)
            }
        })
    })
    .put((req, res)=>{
        const movie = {}
        movie.name = "Something new"
        movie.genre="New genre"
      Movie.findOneAndUpdate({_id:req.params.movieId}, movie, (err, docs)=>{
          if(err){
            res.send(err)
          }
          else{
    res.json(docs)
          }
      })
    })

    return movieRouter

}

export default myRouter;