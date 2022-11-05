const express = require('express');
require('dotenv').config();
const app = express();
const todoHandler = require("./routeHandler/todoHandler");


// Define Json
app.use(express.json());

app.use("/todo", todoHandler);
app.get('/', function (req, res) {
  res.status(200).json({
    message: "Application is Running port 3000."
  });
});


// default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({ error: err });
  }
  
  app.use(errorHandler);


app.listen(3000, function(){
    console.log("Server is Running...: http://localhost:3000")
});