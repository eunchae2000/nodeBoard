// TODO: DB와 연결하여 글 목록을 보여주기

const mysql = require('mysql2/promise');
const pool = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '0000',
    database : 'boardDb'
});

module.exports = pool;