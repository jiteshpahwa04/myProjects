const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
    value:{
        type: Number,
        default: 0,
    }
});

module.exports = mongoose.model("TotalExpense", expenseSchema);