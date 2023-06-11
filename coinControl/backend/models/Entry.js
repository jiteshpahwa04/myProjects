const mongoose = require("mongoose");

const entrySchema = mongoose.Schema({
    name: {
        type: String,
        default: "Personal",
    },
    moneySpent: {
        type: Number,
        default: null,
    },
    moneyReceived: {
        type: Number,
        default: null,
    }
});

module.exports = mongoose.model("Entry", entrySchema);