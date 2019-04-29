const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "report_wildfire"
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