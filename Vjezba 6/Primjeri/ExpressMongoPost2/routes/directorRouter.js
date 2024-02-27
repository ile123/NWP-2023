import express from "express"
import mongoose from "mongoose"
import { Movie } from "../models/MovieModel.js";
import { Director } from "../models/DirectorModel.js";
const directorRouter = express.Router();


const route = ()=>{
    directorRouter.route('/addDirector')
    .post((req, res)=>{     
            const director = new Director(req.body);
            director.save()
            return res.status(201).json(director)       
       
    })

    return directorRouter;
}


export default route;
