const express = require('express')
const router = require('./routes')

const app = express()
app.use(express.json())

app.use('/api/chirps', router)

app.listen(process.env.PORT || '3000', () =>{
    console.log(`Server is running on port: ${process.env.PORT || '3000'}`);
})

// const cors = require('cors');

// const port = 8080;

// const axios = require("axios");
// const mysql = require('mysql');

// //Adding better logging functionality
// const morgan = require("morgan");




// app.use(cors())




// var connection = mysql.createConnection({
//     host: DATBASE_HOST,
//     user: DATABASE_USER,
//     password: DATABASE_PASSWORD,
//     database: DATABASE_NAME
// });

// connection.connect(function(err){
//     if (err) throw err;
//     console.log("Connected!");
// });