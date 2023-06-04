const Task = require("../models/Task");

exports.CreateController = async(req, res)=>{
    try{
        const {taskName, urgency, date} = req.body;
        const task = new Task({
            taskName, urgency, date,
        })
        const savedTask = await task.save();
        res.status(200).json({
            message: "Task has been created",
            task: task,
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message,
        })
    }
}