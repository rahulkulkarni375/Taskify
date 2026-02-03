const pool = require("../config/db");

async function getTodo() {
  try {
    console.log("In getTodo Service")
    // CALL count_completed_todos(NULL) this in nodejs backend
    const query = `select * from todos;`;
    const result = await pool.query(query);
    const execProcedure = `CALL count_completed_todos($1, $2);`;
    const proceedureRes = await pool.query(execProcedure, [null, null]);

    return { result: result.rows, count: proceedureRes.rows };
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

async function patchTodo(updateTodo) {
  try {
    console.log("In patchTodo Service : ", updateTodo)
    const query = `UPDATE todos
                SET completed = ${updateTodo.status}
                WHERE id = ${updateTodo.id};`;

    const result = await pool.query(query);
    return result.rowCount;
  } catch (error) {
    console.error("Error getting patchTodo Service :", error);
    throw error;
  }
}

async function deleteTodo() {
  try {
    console.log("In deleteTodo Service : ")
    const query = `DELETE FROM todos WHERE completed = true RETURNING *`;
    const result = await pool.query(query);
    return result.rowCount;
  } catch (error) {
    console.error("Error getting deleteTodo Service :", error);
    throw error;
  }
}



module.exports = { getTodo, postTodo, patchTodo, deleteTodo }

