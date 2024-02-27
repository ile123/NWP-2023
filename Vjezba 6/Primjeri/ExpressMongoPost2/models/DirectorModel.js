import mongoose from "mongoose"

const DirectorModel = new mongoose.Schema(
    {
        "name":{type:String},
    }
)

export const Director =  mongoose.model('Director', DirectorModel);