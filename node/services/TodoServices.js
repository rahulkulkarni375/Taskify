const pool = require("../config/db");

async function getTodo() {
  try {
    console.log("In getTodo Service")
    const query = `select * from todos;`;
    const result = await pool.query(query);

    return result.rows;
  } catch (error) {
    console.error("Error getting getTodo Service :", error);
    throw error;
  }
}

async function postTodo(newTodo) {
  try {
    console.log("In postTodo Service")
    const query = `INSERT INTO todos (text, completed)
                   VALUES ('${newTodo}', false);`;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error getting postTodo Service :", error);
    throw error;
  }
}



module.exports = { getTodo, postTodo }