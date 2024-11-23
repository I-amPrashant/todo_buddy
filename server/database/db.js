import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();//loads environment variables from .env file

const dbConnection=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI)
    }catch(e){
        console.log("couldn't connect to database. Try again", e);
    }
}

export default dbConnection;