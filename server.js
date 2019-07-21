var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var handlebarsEngine = require('express-handlebars');
const routes = require('./routes')

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();
// Configure middleware
app.engine('handlebars', handlebarsEngine());
app.set('view engine', 'handlebars');
// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/charlestonNews";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.use('/', routes)

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});