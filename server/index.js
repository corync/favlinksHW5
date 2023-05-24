
// importing express into project
const express = require("express")

// define a PORT for our server to run
const PORT = 8000

// initialize an express application 
const app = express();

// start app at port
app.listen(PORT, ()=>{
    console.log(`Server is listening on PORT ${PORT}`)
})