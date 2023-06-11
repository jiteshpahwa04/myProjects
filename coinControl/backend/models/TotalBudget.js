const mongoose = require("mongoose");

const budgetSchema = mongoose.Schema({
    value:{
        type: Number,
        default: 0,
    }
});

module.exports = mongoose.model("TotalBudget", budgetSchema);