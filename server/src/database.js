const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fresfruit'
});

mysqlConnection.connect((err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('DB is connected!');
    }
});

module.exports = mysqlConnection;