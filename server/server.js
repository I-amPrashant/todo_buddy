import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

const app=express();

app.use(cors());//for cross origin resource sharing.
dotenv.config();//loads environment variables from .env file

const port=process.env.PORT

app.post('/newTask', async(req, res)=>{
    try{
        console.log('as')
    }catch(e){
        res.status(500).send({
            success:false,
            message:`internal server error ${e}`
        })
    }
})


//app listen 
app.listen(port , ()=>{
    console.log(`server is running on port ${port}`);
})