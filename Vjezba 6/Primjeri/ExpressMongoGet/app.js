import express from "express"
import mongoose from "mongoose";
import { Movie } from "./models/MovieModel.js";

const app = express();
const db = mongoose.connect('mongodb://localhost/moviesDB'); // my database collection
const port = process.env.PORT || 3000

const movieRouter = express.Router()
app.use('/api',movieRouter);




movieRouter.get('/', (req, res)=>{
    res.send('Welcome to my API');
})

movieRouter.get('/movies', (req, res)=>{
    const querry = {}
    Movie.find((err, movies)=>{
        if(err){
            res.send(err)
        }
        else{
            return res.json(movies)
        }
    })
})

movieRouter.get('/movies/:id', (req, res)=>{
    Movie.findById(req.params.id, (err, movie)=>{
        if(err){
            console.log(movie)
        }
        else{
            return res.json(movie)
        }
    })

})

movieRouter.get('/moviesByName/:movieName', (req, res)=>{
    console.log(req.params.movieName)
    Movie.find({name:req.params.movieName}, (err, movie)=>{
        console.log(req.params.movieName)
        if(err){
            res.send(err)
        }
        else{
            res.json(movie)
        }
    })

})

app.listen(port, ()=>{
    console.log("Running on port" + port)
})




