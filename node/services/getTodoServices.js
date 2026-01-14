const pool  = require("../config/db");

async function getTodo() {
  try {
    console.log("In Service")
    const query = `select * from todos;`;
    const result = await pool.query(query);
    console.log("Result : ",result)
    return result.rows;
  } catch (error) {
    console.error("Error getting getTodo Service :", error);
    throw error;
  }
}


module.exports = { getTodo }