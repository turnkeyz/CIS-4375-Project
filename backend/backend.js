//import and load express app on a specified port
const express = require('express')
const cors = require('cors');
const app = express()
const port = 8080;
const dotenv = require("dotenv");
const axios = require("axios");
const mysql = require('mysql');

//Adding better logging functionality
const morgan = require("morgan");

dotenv.config();
app.use(cors())

var connection = mysql.createConnection({
    host: "",
    user: "",
    password: ""
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected!");
});