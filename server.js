const express = require('express')
const app = express()

app.listen(3000, () =>{
    console.log("Node APi is running on port 3000");
})

// routes

app.get('/',(req,res)=>{
    res.send('Hello Node API')
})

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

// app.listen(3000)