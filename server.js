var allItem = require("./website/js/data.json");

var fs = require("fs");

var express = require("express");

var app = express();

var server = app.listen(process.env.PORT || 3000, listening);

function listening() {
  console.log("Listening");
}

app.use(express.static("website"));
