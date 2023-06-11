const mongoose = require("mongoose");

const balanceSchema = mongoose.Schema({
    value:{
        type: Number,
        default: 0,
    }
});

module.exports = mongoose.model("TotalMoney", balanceSchema);