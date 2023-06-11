const TotalMoney = require("../models/TotalMoney");
const TotalBudget = require("../models/TotalBudget");
const TotalExpense = require("../models/TotalExpense");

exports.updateMoney = async(req, res)=>{
    try{
        const {id} = req.params;
        const {val} = req.body;
        await TotalMoney.findByIdAndUpdate({_id: id},{
            value: val
        })
        return res.status(200).json({
            success: true,
            message: "Field is Updated !!",
        })
    }catch(err){
        console.log("Error aaya hai: ",err);
        return res.status(500).json({
            success: false,
            message: err,
        })
    }
};
exports.updateBudget = async(req, res)=>{
    try{
        const {id} = req.params;
        const {val} = req.body;
        await TotalBudget.findByIdAndUpdate({_id: id},{
            value: val
        })
        return res.status(200).json({
            success: true,
            message: "Field is Updated !!",
        })
    }catch(err){
        console.log("Error aaya hai: ",err);
        return res.status(500).json({
            success: false,
            message: err,
        })
    }
};
exports.updateExpense = async(req, res)=>{
    try{
        const {id} = req.params;
        const {val} = req.body;
        await TotalExpense.findByIdAndUpdate({_id: id},{
            value: val
        })
        return res.status(200).json({
            success: true,
            message: "Field is Updated !!",
        })
    }catch(err){
        console.log("Error aaya hai: ",err);
        return res.status(500).json({
            success: false,
            message: err,
        })
    }
};