const express = require('express')
const app = express()
app.use(express.json()) // Use built-in JSON middleware to automatically parse JSON


const router = require("./router")(app)
app.listen(3000,
  () => console.log('Example app listening on port 3000!'))
