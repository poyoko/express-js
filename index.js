const express = require('express');
require('dotenv').config();
const app = express();

app.get('/', function (req, res) {
  res.status(200).json({
    message: "Application is Running port 3000."
  });
});

app.listen(3000, function(){
    console.log("Server is Running...: http://localhost:3000")
});