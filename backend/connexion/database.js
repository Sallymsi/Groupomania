const mysql = require('mysql');

const db = mysql.createConnection({
    database: "groupomania",
    host: "localhost",
    user: "root",
    password: "peluche",
})

module.exports = db;