const Entry = require("../models/Entry");

exports.createEntry = async(req, res)=>{
    try{
        const {name, moneySpent, moneyReceived} = req.body;
        const entry = await Entry.create({
            name, moneySpent, moneyReceived
        });
        return res.status(200).json({
            success: true,
            message: "Entry is Created !!",
        })
    }catch(err){
        console.log("Error aaya hai: ",err);
        return res.status(500).json({
            success: false,
            message: err,
        })
    }
};