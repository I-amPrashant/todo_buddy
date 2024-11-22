import express from 'express'

const app=express();



//app listen 
app.listen(5000 , ()=>{
    console.log("Server running on port 5000");
})