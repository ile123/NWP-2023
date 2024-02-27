import mongoose from "mongoose"

const movieModel = new mongoose.Schema(
    {
        name:{type: String},
        genre:{type: String, default:"Comedy"},
        director:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Director'
        }
    }
)

export const Movie = mongoose.model('Movie', movieModel)