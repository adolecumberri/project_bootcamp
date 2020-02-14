const mysql = require("mysql");

const connection = mysql.createConnection({
    port: '8080',
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'proyect_bootcamp'
});


module.exports = connection;