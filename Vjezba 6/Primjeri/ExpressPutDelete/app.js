import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser";
import movieRouter from "./routes/movieRouter.js"

const app = express();
const db = mongoose.connect('mongodb://localhost/moviesDB')
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use('/api', movieRouter())

app.listen(port, ()=>{
    console.log("Running on port" + port)
})