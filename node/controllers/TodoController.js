const todoService = require("../services/TodoServices");

async function getTodo(req, res) {
  try {
    const result = await todoService.getTodo();
    res.status(500).json(result);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the getTodo " });
  }
}

async function postTodo(req, res) {
  try {
    const { newTodo } = req.body;
    const result = await todoService.postTodo(newTodo);
    res.status(500).json(result);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the postTodo " });
  }
}

module.exports = { getTodo, postTodo };
