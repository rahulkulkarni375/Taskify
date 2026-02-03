const todoService = require("../services/TodoServices");

async function getTodo(req, res) {
  try {
    const allTodosNcount = await todoService.getTodo();
    const result = allTodosNcount.result
    const count = allTodosNcount.count
    res.status(200).json({result,count});
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the getTodo " });
  }
}

async function postTodo(req, res) {
  try {
    const { newTodo } = req.body;
    const result = await todoService.postTodo(newTodo);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the postTodo " });
  }
}

async function patchTodo(req, res) {
  try {
    const { updateTodo } = req.body;
    const result = await todoService.patchTodo(updateTodo);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the patchTodo " });
  }
}

async function deleteTodo(req, res) {
  try {
    const result = await todoService.deleteTodo();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting Todos " });
  }
}


module.exports = { getTodo, postTodo, patchTodo, deleteTodo };
