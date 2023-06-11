const Entry = require("../models/Entry");

exports.getAllEntries = async(req, res)=>{
    try{
        const entries = await Entry.find();

        return res.status(200).json({
            success: true,
            data: entries,
        })
    }catch(err){
        console.log("Error aaya hai: ",err);
        return res.status(500).json({
            success: false,
            message: err,
        })
    }
}