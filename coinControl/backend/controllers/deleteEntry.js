const Entry = require("../models/Entry");

exports.deleteEntry = async(req, res)=>{
    try{
        const {id} = req.params;
        const deletedEntry = await Entry.findByIdAndDelete({_id: id});
        return res.status(200).json({
            success: true,
            message: "Entry deleted",
            entry: deletedEntry
        })
    }catch(err){
        console.log("Error aaya hai: ",err);
        return res.status(500).json({
            success: false,
            message: err,
        })
    }
}