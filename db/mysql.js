const mysql = require('mysql');
const db = require('../config/db');

const con = mysql.createConnection({
  host: db.HOST,
  user: db.USERNAME,
  password: db.PASSWORD,
  database: db.DATABASE,
  port: db.PORT
});

con.connect(function(err) {
  if (err) console.log(err);
  else console.log('database connected!')
});

exports.query = function(_sql) {
    return new Promise(function(resolve, reject) {
        con.query(_sql, function (err, result) {
            if (err) reject(err);
            else resolve(result);
        });
    });
}