var mysql = require('mysql');

var pool = mysql.createPool({
  host: 'us-cdbr-iron-east-03.cleardb.net',
  user: 'b3a58478f963a6',
  password: 'e4081158',
  database: 'heroku_db65f8e9326be4b'
});

// connection.connect();

// connection.query('SELECT * from animals', function(err, rows, fields) {
//   if (!err)
//     console.log('The solution is: ', rows);
//   else
//     console.log('Error while performing Query.');
// });

// connection.end();

getAllEmployees = function(callback) {
  var sql = "SELECT * from employee";
  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
};

module.exports.getAllEmployees = getAllEmployees

getEmployeeByFirstName = function(data, callback) {
  console.log(data);
  //we have to use backticks " ` " when wanting to select columns with spaces in their name
  var sql = "SELECT * from employee WHERE `First Name`=?"
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(sql, data["First Name"], function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
}
module.exports.getEmployeeByFirstName = getEmployeeByFirstName