const express = require("express");
const router = express.Router();

const {createEntry} = require("../controllers/createEntry");
const {getAllEntries} = require("../controllers/getAllEntries");
const {deleteEntry} = require("../controllers/deleteEntry");

router.get("/getEntries", getAllEntries);
router.post("/createEntry", createEntry);
router.delete("/deleteEntry/:id", deleteEntry);


const {getTotalBudget} = require("../controllers/getTotals");
const {getTotalMoney} = require("../controllers/getTotals");
const {getTotalExpense} = require("../controllers/getTotals");
router.get("/getTotalBudget", getTotalBudget);
router.get("/getTotalMoney", getTotalMoney);
router.get("/getTotalExpense", getTotalExpense);

const {updateMoney} = require("../controllers/updateTotals");
const {updateBudget} = require("../controllers/updateTotals");
const {updateExpense} = require("../controllers/updateTotals");
router.put("/updateMoney/:id", updateMoney);
router.put("/updateBudget/:id", updateBudget);
router.put("/updateExpense/:id", updateExpense);

module.exports = router;