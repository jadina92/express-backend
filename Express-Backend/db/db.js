var mysql2 = require('mysql2');

var db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'formation'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

module.exports = db;