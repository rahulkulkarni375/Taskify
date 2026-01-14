const todoService = require("../services/getTodoServices");

async function getTodo(req, res) {
  try {
    const result = await todoService.getTodo();
    res.status(500).json(result);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the bd Unit " });
  }
}

module.exports = { getTodo };
