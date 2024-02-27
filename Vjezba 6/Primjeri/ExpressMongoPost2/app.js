import express from "express"
import mongoose from "mongoose"
import movieRouter from './routes/movieRouter.js'
import directorRouter from './routes/directorRouter.js'
import bodyParser from "body-parser"

const app = express();
const db = mongoose.connect('mongodb://0.0.0.0:27017/moviesDB');
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//const movieRouter = express.Router()

 
app.use('/api', movieRouter())
app.use('/api', directorRouter())


app.listen(port, ()=>{
    console.log("Running on port " + port);
})


