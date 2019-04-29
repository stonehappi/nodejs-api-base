const mssql = require('mssql');

const config = {
	server: "127.0.0.1",
	database: "HOTSPOTDB",
	user: "hotspot",
	password: "1441459",
	port: 1433,
	options: {
		encrypt: true
	}
};

const con = mssql.connect(config, function (err) {
	if (err) console.log(err);
	else console.log('MSsql connected!');
});

exports.query = function (_sql) {
	const request = new mssql.Request();
	return new Promise(function (resolve, reject) {
		request.query(_sql, function (err, result) {
			if (err) {
				console.log(_sql);
				reject(err)
			}
			else resolve(result);
		});
	});
}
