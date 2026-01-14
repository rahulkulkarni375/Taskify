const { Pool } = require('pg');


const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "admin",
  port: "5432",
  database: "postgres",
});


module.exports = pool; 
