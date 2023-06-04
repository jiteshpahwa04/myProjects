const Task = require("../models/Task");

exports.UpdateStatus = async(req, res)=>{
    try{
        const {id} = req.params;
        const {taskName, status} = req.body;

        const task = await Task.findByIdAndUpdate(
            {_id: id},
            {taskName, status},
        )

        res.status(200).json({
            success: true,
            message: "Task Status Updated",
            task: task,
        })
    }catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                success: false,
                data: "internal server error",
                message: err.message,
            }
        )
    }
}