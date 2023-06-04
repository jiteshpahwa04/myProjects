const express = require("express");
const router = express.Router();

const {getAllTasks} = require("../controller/GetController");
const {CreateController} = require("../controller/CreateController");
const {UpdateStatus} = require("../controller/UpdateStatusController");
const {deleteController} = require("../controller/DeleteController");

router.get("/getAllTasks",getAllTasks);
router.post("/CreateController",CreateController);
router.put("/UpdateStatus/:id",UpdateStatus);
router.delete("/deleteController/:id",deleteController);

module.exports = router;