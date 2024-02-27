import mongoose from "mongoose"

const {Schema} = mongoose;

const userModel = new Schema(
    {
    name:{type:String},
    password:{type:String, required: true},
    email:{type:String, unique: true, dropDups: true, required:true},
    }
);

export default mongoose.model('User', userModel);