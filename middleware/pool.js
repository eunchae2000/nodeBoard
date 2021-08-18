// TODO: DB와 연결하여 글 목록을 보여주기

const mysql = require('mysql2/promise');
const pool = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    port: 3306,
    password : '01090442332',
    database : 'boardDb'
});

module.exports = pool;