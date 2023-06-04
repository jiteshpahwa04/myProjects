const express = require("express");
const app = express();

const cors = require("cors");
app.use(
    cors({
      origin: "http://localhost:3000",
    })
);

require("dotenv").config();

app.use(express.json());

const dbConnect = require("./config/database");
dbConnect();

const task = require("./routes/task");
app.use("/api/v1", task);

const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`The server is started at ${PORT}`);
})

app.get("/",(req, res)=>{
    res.send(`<h1>This is HomePage</h1>`);
})
