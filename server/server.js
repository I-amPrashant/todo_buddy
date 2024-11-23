import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnection from './database/db.js'
import Task from './models/taskModel.js'

const app=express();

app.use(cors());//for cross origin resource sharing.
dotenv.config();//loads environment variables from .env file

const port=process.env.PORT;

//database connection 
dbConnection();

app.use(express.json());//for parsing json data

//add task route
app.post('/newTask', async(req, res)=>{
    try{
       const newTask=await Task.create(req.body.task)
       if(newTask){
        res.status(201).send({
            success:true,
            message:"Task added successfully"
        })
       }else{
        res.status(400).send({
            success:false,
            message:"Task could not be created. Try again"
        })
       }

    }catch(e){
        res.status(500).send({
            success:false,
            message:`internal server error ${e}`
        })
    }
})

//get all tasks route
app.get('/allTasks', async(req, res)=>{
    try{
        const allTasks=await Task.find();

        if(allTasks){
            res.status(200).send({
                success:true,
                message:"all tasks fetched successfully",
                allTasks:allTasks
            })
        }else{
            res.status(400).send({
                success:false,
                message:"Tasks could not be fetched. Try again"
            })
        }

    }catch(e){
        res.status(500).send({
            success:false,
            message:`internal server error ${e}`
        })
    }
})

//delete task route
app.delete('/deleteTask/:id', async(req, res)=>{
    try{
        const taskId=req.params.id;
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if(deletedTask){
            res.status(200).send({
                success:true,
                message:"Task deleted successfully"
            })
        }else{
            res.status(400).send({
                success:false,
                message:"Task could not be deleted. Try again"
            })
        }
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