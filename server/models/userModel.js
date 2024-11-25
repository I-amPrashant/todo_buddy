import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    emailA:{
        type:String,
        required:true,
    }
}, {timestamps:true})

export default mongoose.model('User', userSchema);