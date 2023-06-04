const Task = require("../models/Task");

exports.getAllTasks = async(req, res)=>{
    try{
        const tasks = await Task.find();
        res.status(200).json({
            success: true,
            tasks: tasks,
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message,
        })
    }
}