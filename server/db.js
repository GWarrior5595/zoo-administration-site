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
  var sql = "SELECT DISTINCT employee.`Employee ID`, employee.`First Name`, employee.`Last Name`, employee.`Enclosure ID` as `Enclosure Name`, shop.`Name` as `Shop Name`, employee.`Job Desciption`, date(employee.`Hire Date`) as `Hire Date`, employee.`Shifts`, employee.`Salary` "
          + "FROM heroku_db65f8e9326be4b.employee as employee, heroku_db65f8e9326be4b.shop as shop "
          + "WHERE employee.`Shop ID` = shop.`Shop ID` "

          + "UNION ALL "

          + "SELECT DISTINCT employee.`Employee ID`, employee.`First Name`, employee.`Last Name`, enclosure.`Name` as `Enclosure Name`, employee.`Shop ID` as `Shop Name`, employee.`Job Desciption`, date(employee.`Hire Date`) as `Hire Date`, employee.`Shifts`, employee.`Salary` "
          + "FROM heroku_db65f8e9326be4b.enclosure as enclosure, heroku_db65f8e9326be4b.employee as employee "
          + "WHERE employee.`Enclosure ID` = enclosure.`Enclosure` "

          + "ORDER BY `Employee ID`"

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

getIDAndNameOfShops = function(data, callback){
  var sql = "SELECT `Shop ID`, `Name`"
          + "FROM heroku_db65f8e9326be4b.shop";
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
}

module.exports.getIDAndNameOfShops = getIDAndNameOfShops

getIDAndNameOfEnclosures = function(data, callback){
  var sql = "SELECT `Enclosure`, `Name`"
          + "FROM heroku_db65f8e9326be4b.enclosure";
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
}

module.exports.getIDAndNameOfEnclosures = getIDAndNameOfEnclosures

insertEmployee = function(data, callback){
  var sql = "INSERT INTO employee SET ?"
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(sql, data, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
}

module.exports.insertEmployee = insertEmployee

deleteEmployeeByID = function(data, callback){
  var sql = "DELETE from employee "
          + "WHERE `Employee ID` = ?"
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(sql, data['Employee ID'], function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
}

module.exports.deleteEmployeeByID = deleteEmployeeByID