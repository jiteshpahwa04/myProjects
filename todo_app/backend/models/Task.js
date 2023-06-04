const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    taskName:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        default: "pending",
    },
    urgency:{
        type: String,
        default: "",
        enum: ["","Low", "Medium", "High"],
    },
    date: {
        type: String,
        default: "",
    }
});

module.exports = mongoose.model("Task", TaskSchema);