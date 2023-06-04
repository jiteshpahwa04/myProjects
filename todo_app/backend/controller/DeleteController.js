const Task = require("../models/Task");

exports.deleteController = async(req, res)=>{
    try{
        const {id} = req.params;
        
        const deleteTask = await Task.findByIdAndDelete(
            {_id: id}
        )

        res.status(200).json({
            success: true,
            message: "Task Deleted",
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