import  mongoose  from "mongoose";

const movieModel = new mongoose.Schema(
    {
        name:{type:String}
    }
)

export const Movie = mongoose.model('Movie', movieModel);