const mysql = require('mysql');

// Information de connexion mySql :
module.exports = function dbCon() {
    return mysql.createConnection({
        database: "groupomania",
        host: "localhost",
        user: "root",
        password: "peluche",
    })
};