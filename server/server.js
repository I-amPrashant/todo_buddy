import express from "express";
import cors from "cors";
import cron from "node-cron"; //it is a library to run periodic checks on the database to identify task with deadline.
import dotenv from "dotenv";
import dbConnection from "./database/db.js";
import Task from "./models/taskModel.js";
import sendEmail from "./emailSender.js";
import User from './models/userModel.js'

const app = express();

app.use(cors()); //for cross origin resource sharing.
dotenv.config(); //loads environment variables from .env file

const port = process.env.PORT;

//database connection
dbConnection();

app.use(express.json()); //for parsing json data

//add task route
app.post("/newTask", async (req, res) => {
  try {
    const newTask = await Task.create(req.body.task);
    if (newTask) {
      res.status(201).send({
        success: true,
        message: "Task added successfully",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Task could not be created. Try again",
      });
    }
  } catch (e) {
    res.status(500).send({
      success: false,
      message: `internal server error ${e}`,
    });
  }
});

//get all tasks route
app.get("/allTasks", async (req, res) => {
  try {
    const allTasks = await Task.find();

    if (allTasks) {
      res.status(200).send({
        success: true,
        message: "all tasks fetched successfully",
        allTasks: allTasks,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Tasks could not be fetched. Try again",
      });
    }
  } catch (e) {
    res.status(500).send({
      success: false,
      message: `internal server error ${e}`,
    });
  }
});

//get task by filter
app.get("/allTasks/:filter", async (req, res) => {
  try {
    const filter = req.params.filter;
    const allTasks = await Task.find({ taskStatus: filter });

    if (allTasks) {
      res.status(200).send({
        success: true,
        message: "all tasks fetched successfully",
        allTasks: allTasks,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Tasks could not be fetched. Try again",
      });
    }
  } catch (e) {
    res.status(500).send({
      success: false,
      message: `internal server error ${e}`,
    });
  }
});

//delete task route
app.delete("/deleteTask/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (deletedTask) {
      res.status(200).send({
        success: true,
        message: "Task deleted successfully",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Task could not be deleted. Try again",
      });
    }
  } catch (e) {
    res.status(500).send({
      success: false,
      message: `internal server error ${e}`,
    });
  }
});

//update task route
app.put("/updateTask/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body.task);
    if (updatedTask) {
      res.status(200).send({
        success: true,
        message: "Task updated successfully",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Task could not be updated. Try again",
      });
    }
  } catch (e) {
    res.status(500).send({
      success: false,
      message: `internal server error ${e}`,
    });
  }
});

//update task status route
app.put("/updateTask/status/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await Task.updateOne(
      { _id: taskId },
      { $set: { taskStatus: req.body.taskStatus } }
    );
    if (updatedTask) {
      res.status(200).send({
        success: true,
        message: "Task status updated successfully",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Task could not be updated. Try again",
      });
    }
  } catch (e) {
    res.status(500).send({
      success: false,
      message: `internal server error ${e}`,
    });
  }
});

let mailOptions;

//route for registering email
app.post("/registerEmail", async (req, res) => {
  try {
    const newEmail=await User.create(req.body.mailAddress);

    //creating a new email 
    if (newEmail) {
        mailOptions={
            from:'airmax50cent@gmail.com',
            to:req.body.mailAddress.emailA,
            subject:'registering email',
            text: "your email has been registered", // plain text body
        }
    
        const info = await sendEmail(mailOptions);

        res.status(201).send({
          success: true,
          message: "email created  successfully",
          info:info
        });
      } else {
        res.status(400).send({
          success: false,
          message: "email could not be created. try again",
        });
      }
  }catch (e) {
    res.status(500).send({
      success: false,
      message: `internal server error ${e}`,
    });
  }
});



//schedule cron to run every hour to check for deadline .
// cron.schedule("*/5 * * * * ", async () => {
//   console.log("checking deadlines... ");

//   const tasks = await Task.find();

//   for (let task of tasks) {
//     const deadline = new Date(task.taskDeadline).toLocaleString();
//     const today = new Date().toLocaleString();

//     const deadlineDay = deadline.split(",")[0];
//     const todayDay = today.split(",")[0];

//     const deadlineHours = new Date(deadline).getHours();
//     const todayHours=new Date().getHours();

//     if(deadlineDay===todayDay && todayHours===deadlineHours-1){//send email 1 hour early 
//         const info =await sendEmail(mailOptions);
//         console.log(info);
//     }
//   }
// });

//app listen
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
