const TotalMoney = require("../models/TotalMoney");
const TotalBudget = require("../models/TotalBudget");
const TotalExpense = require("../models/TotalExpense");

exports.getTotalBudget = async(req, res)=>{
    try{
        const totalBudget = await TotalBudget.find();

        return res.status(200).json({
            success: true,
            data: totalBudget,
        })
    }catch(err){
        console.log("Error aaya hai: ",err);
        return res.status(500).json({
            success: false,
            message: err,
        })
    }
}
exports.getTotalExpense = async(req, res)=>{
    try{
        const totalExpense = await TotalExpense.find();

        return res.status(200).json({
            success: true,
            data: totalExpense,
        })
    }catch(err){
        console.log("Error aaya hai: ",err);
        return res.status(500).json({
            success: false,
            message: err,
        })
    }
}
exports.getTotalMoney = async(req, res)=>{
    try{
        const totalMoney = await TotalMoney.find();

        return res.status(200).json({
            success: true,
            data: totalMoney,
        })
    }catch(err){
        console.log("Error aaya hai: ",err);
        return res.status(500).json({
            success: false,
            message: err,
        })
    }
}