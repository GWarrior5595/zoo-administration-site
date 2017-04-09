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
  var sql = "SELECT DISTINCT employee.`Employee ID`, employee.`First Name`, employee.`Last Name`, '' as `Enclosure Name`, shop.`Name` as `Shop Name`, employee.`Job Desciption`, DATE_FORMAT(employee.`Hire Date`, '%m/%d/%Y') as `Hire Date`, employee.`Shifts`, employee.`Salary` "
          + "FROM employee, shop "
          + "WHERE employee.`Shop ID` = shop.`Shop ID` "
          + "AND employee.`Enclosure ID` IS NULL "

          + "UNION ALL "

          + "SELECT DISTINCT employee.`Employee ID`, employee.`First Name`, employee.`Last Name`, enclosure.`Name` as `Enclosure Name`, '' as `Shop Name`, employee.`Job Desciption`, DATE_FORMAT(employee.`Hire Date`, '%m/%d/%Y') as `Hire Date`, employee.`Shifts`, employee.`Salary` "
          + "FROM enclosure, employee "
           + "WHERE employee.`Enclosure ID` = enclosure.`Enclosure` "
          + "AND employee.`Shop ID` IS NULL "
          
          + "UNION ALL "
			
          + "SELECT DISTINCT employee.`Employee ID`, employee.`First Name`, employee.`Last Name`, enclosure.`Name` as `Enclosure Name`, shop.`Name` as `Shop Name`, employee.`Job Desciption`, DATE_FORMAT(employee.`Hire Date`, '%m/%d/%Y') as `Hire Date`, employee.`Shifts`, employee.`Salary` "
          + "FROM enclosure, employee, shop "
          + "WHERE employee.`Enclosure ID` IS NOT NULL AND employee.`Shop ID` IS NOT NULL AND employee.`Enclosure ID` = enclosure.`Enclosure` AND employee.`Shop ID` = shop.`Shop ID` "
          
          + "ORDER BY `Employee ID` "

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

getAllOrders = function(callback) {
  //we have to use backticks " ` " when wanting to select columns with spaces in their name
  var sql = "SELECT DISTINCT ord.`Order ID`, DATE_FORMAT(ord.`Date`, '%m/%d/%Y') as `Date`, ord.`Time`,ord.`Payment Type`, ord.`Payment Amount`, shop.`Name` as `Shop Name`, concat(customers.`First Name`, ' ',customers.`Last Name`) as `Customer Name` "
          + "FROM orders as ord, shop, customers "
          + "WHERE ord.`Shop ID` = shop.`Shop ID` "
          + "AND ord.`Customer ID` = customers.`Customer ID` "
          + "Order By `Order ID`"

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
module.exports.getAllOrders = getAllOrders


getEmployeeByID = function(data, callback) {
  //we have to use backticks " ` " when wanting to select columns with spaces in their name
  var sql = "SELECT * from employee WHERE `Employee ID`=?"
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(sql, data["Employee ID"], function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
}
module.exports.getEmployeeByID = getEmployeeByID

getIDAndNameOfShops = function(callback){
  var sql = "SELECT `Shop ID`, `Name` "
          + "FROM shop";
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

getIDAndNameOfEnclosures = function(callback){
  var sql = "SELECT `Enclosure`, `Name` "
          + "FROM enclosure";
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

editEmployeeByID = function(data, id, callback){
  var sql = "UPDATE employee set ? WHERE `Employee ID` = ? "

  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(sql, [data, id], function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
}

module.exports.editEmployeeByID = editEmployeeByID

getTotalRevenueByShopTypeID = function(data, callback){
  var sql = "SELECT DISTINCT SUM(orders.`Payment Amount`) as `Revenue`, type.`Type` "
            + "FROM orders, shop, `Shop Type` as type "
            + "WHERE orders.`Shop ID` = shop.`Shop ID` "
            + "AND type.`Shop Type ID` = shop.`Shop Type ID` "
		        + "AND shop.`Shop Type ID` = ? "

  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(sql, data['Shop Type ID'], function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
}

module.exports.getTotalRevenueByShopTypeID = getTotalRevenueByShopTypeID

getTotalOrderNumberByShopTypeID = function(data, callback){
  var sql = "SELECT DISTINCT COUNT(orders.`Payment Amount`) as `Total Orders` "
            + "FROM orders, shop "
            + "WHERE orders.`Shop ID` = shop.`Shop ID` "
		        + "AND shop.`Shop Type ID` = ? "

  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(sql, data['Shop Type ID'], function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
}

module.exports.getTotalOrderNumberByShopTypeID = getTotalOrderNumberByShopTypeID

getAllShopTypes = function(callback){
  var sql = "SELECT * FROM `Shop Type`"

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

module.exports.getAllShopTypes = getAllShopTypes

getAllShops = function(callback){
  var sql = "SELECT * FROM `Shop`"

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

module.exports.getAllShops = getAllShops


getTotalOrderNumberByShopID = function(data, callback){
  var sql = "SELECT DISTINCT shop.`Name`, COUNT(orders.`Shop ID`) as 'Total Orders', shop.`Shop ID` "
          + "FROM shop, orders "
          + "WHERE shop.`Shop ID` = orders.`Shop ID` AND orders.`Shop ID` = ? "

  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(sql, data['Shop ID'], function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
}

module.exports.getTotalOrderNumberByShopID = getTotalOrderNumberByShopID

getRevenueOfAllOrders = function(callback){
  var sql = "SELECT SUM(orders.`Payment Amount`) as `Revenue` FROM orders, shop, `Shop Type` as type "
          + "WHERE orders.`Shop ID` = shop.`Shop ID` "
          + "AND type.`Shop Type ID` = shop.`Shop Type ID` "
          + "AND NOT type.type = 'Donations' "

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

module.exports.getRevenueOfAllOrders =  getRevenueOfAllOrders

getAllOrdersFromDate = function(data, callback){
  var sql = "SELECT DISTINCT ord.`Order ID`, DATE_FORMAT(ord.`Date`, '%m/%d/%Y') as `Date`, ord.`Time`,ord.`Payment Type`, ord.`Payment Amount`, shop.`Name` as `Shop Name`, concat(customers.`First Name`, ' ',customers.`Last Name`) as `Customer Name`  "
          + "FROM orders as ord, shop, customers "
          + "WHERE DATE(ord.Date) BETWEEN CURDATE() - INTERVAL ? DAY AND CURDATE() "
          + "AND shop.`Shop ID` = ord.`Shop ID` "
          + "AND customers.`Customer ID` = ord.`Customer ID` "

  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(sql, data["Time"], function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
}

module.exports.getAllOrdersFromDate =  getAllOrdersFromDate

getAllOrdersFromDateByShopID = function(data, callback){
  var sql = "SELECT DISTINCT ord.`Order ID`, DATE_FORMAT(ord.`Date`, '%m/%d/%Y') as `Date`, ord.`Time`,ord.`Payment Type`, ord.`Payment Amount`, shop.`Name` as `Shop Name`, concat(customers.`First Name`, ' ',customers.`Last Name`) as `Customer Name`  "
          + "FROM orders as ord, shop, customers "
          + "WHERE ord.`Shop ID` = ? AND DATE(ord.Date) BETWEEN CURDATE() - INTERVAL ? DAY AND CURDATE() "
          + "AND ord.`Shop ID` = shop.`Shop ID` "
          + "AND ord.`Customer ID` = customer.`Customer ID` "

  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(sql, [data['Shop ID'], data["Time"]], function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
}

module.exports.getAllOrdersFromDateByShopID =  getAllOrdersFromDateByShopID

getTotalOrderNumberFromDateByShopID = function(data, callback){
  var sql = "SELECT DISTINCT shop.`Name`, COUNT(orders.`Shop ID`) as 'Total Orders', shop.`Shop ID` "
          + "FROM shop, orders, `Shop Type` as type "
          + "WHERE shop.`Shop ID` = orders.`Shop ID` AND orders.`Shop ID` = ? "
          + "AND DATE(orders.Date) BETWEEN CURDATE() - INTERVAL ? DAY AND CURDATE() "
          + "AND type.`Shop Type ID` = shop.`Shop Type ID` "
          + "AND NOT type.type = 'Donations' "

  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(sql, [data['Shop ID'], data['Time']], function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
}

module.exports.getTotalOrderNumberFromDateByShopID = getTotalOrderNumberFromDateByShopID

// getTotalOrderNumberFromDateByShopTypeID = function(data, callback){
//   var sql = "SELECT DISTINCT COUNT(orders.`Payment Amount`) as `Total Orders` "
//             + "FROM orders, shop "
//             + "WHERE orders.`Shop ID` = shop.`Shop ID` "
// 		        + "AND shop.`Shop Type ID` = ? AND DATE(orders.Date) BETWEEN CURDATE() - INTERVAL ? DAY AND CURDATE() "

//   pool.getConnection(function(err, connection) {
//     if(err) { console.log(err); callback(true); return; }
//     // make the query
//     connection.query(sql, [data['Shop Type ID'], data['Time']], function(err, results) {
//       connection.release();
//       if(err) { console.log(err); callback(true); return; }
//       callback(false, results);
//     });
//   });
// }

// module.exports.getTotalOrderNumberFromDateByShopTypeID = getTotalOrderNumberFromDateByShopTypeID

getTotalRevenueFromDateByShopTypeID = function(data, callback){
  var sql = "SELECT DISTINCT SUM(orders.`Payment Amount`) as `Revenue`, type.`Type` "
            + "FROM orders, shop, `Shop Type` as type "
            + "WHERE orders.`Shop ID` = shop.`Shop ID` "
            + "AND type.`Shop Type ID` = shop.`Shop Type ID` "
		        + "AND shop.`Shop Type ID` = ? AND DATE(orders.Date) BETWEEN CURDATE() - INTERVAL ? DAY AND CURDATE() "
            + "AND NOT type.type = 'Donations' "

  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(sql, [data['Shop Type ID'], data['Time']], function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
}

module.exports.getTotalRevenueFromDateByShopTypeID = getTotalRevenueFromDateByShopTypeID


getAllOrdersFromDateWithDonations = function(data, callback){
  var sql = "SELECT DISTINCT Sum(orders.`Payment Amount`) as `Donation Amount`, type.`Type`, concat(customers.`First Name`, ' ',customers.`Last Name`) as `Customer Name` "
            + "FROM orders, shop, customers,`Shop Type` as type  "
            + "WHERE orders.`Shop ID` = shop.`Shop ID`  "
            + "AND customers.`Customer ID` = orders.`Customer ID`  "
		        + "AND DATE(orders.Date) BETWEEN CURDATE() - INTERVAL ? DAY AND CURDATE()  "
            + "AND shop.`Shop Type ID` = type.`Shop Type ID`  "
            + "AND type.type = 'Donations' "
            + "Group By concat(customers.`First Name`, ' ', customers.`Last Name`) "

  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(sql, data['Time'], function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
}

module.exports.getAllOrdersFromDateWithDonations = getAllOrdersFromDateWithDonations
