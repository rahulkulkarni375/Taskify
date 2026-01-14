const express = require('express')
const cors = require("cors");
const getAllTodo = require("./routes/getTodoRoute");
const app = express()
const port = 3000
const router = express.Router();

app.use(cors());
app.use(express.json())
app.use('/api/to',getAllTodo)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
