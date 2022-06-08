var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(8080, function () {
  
   console.log("server is now on port 8080")
})