const express = require("express");
const router = express.Router();
const getTodoController = require("../controllers/TodoController");

router.get("/all", getTodoController.getTodo); 
router.post("/create-todo", getTodoController.postTodo); 
router.patch("/patch-todo", getTodoController.patchTodo); 
router.delete("/delete-todo", getTodoController.deleteTodo); 

module.exports = router;
