const express = require("express");
const app = express();

require("dotenv").config();

const dbConnect = require("./config/Database");
dbConnect();

const cors = require("cors");
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
);

app.use(express.json());
// CORS Configuration
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`THE SERVER IS UP AND RUNNING AT PORT ${PORT}`);
});

const entryRoutes = require("./routes/entry");
app.use("/api/v1", entryRoutes);
app.get("/", (req, res) => {
    res.send(`<h1>Backend is Running and this is '/' Route</h1>`);
});