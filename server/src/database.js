const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'freshfruit'
});

mysqlConnection.connect((err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('DB is connected!');
    }
});

module.exports = mysqlConnection;