const express = require("express");
const router = express.Router();
const getTodoController = require("../controllers/getTodoController");

router.get("/all", getTodoController.getTodo); 

module.exports = router;
