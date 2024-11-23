import mongoose from "mongoose";

const taskSchema =new mongoose.Schema({
    
    taskImportance:{
        type:String,
        required:true,
    },

    taskStatus:{
        type:String,
        required:true,
        default:'incomplete',
        enum:['incomplete','complete']
    },

    taskName:{
        type:String,
        required:true,
        maxLength:50,
    },
    taskDeadline:{
        type:Date,
        required:true,
    }


})

export default mongoose.model('Task', taskSchema);