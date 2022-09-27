const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit:10,
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME ,
    host: process.env.DATBASE_HOST,
    port: process.env.DATABASE_PORT

})


module.exports = pool