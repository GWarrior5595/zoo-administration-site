var mysql = require('mysql');

var pool = mysql.createPool({
  host: process.env.CLEARDBHOSTNAME,
  user: process.env.CLEARDBUSER,
  password: process.env.CLEARDBPASSWORD,
  database: process.env.CLEARDBDATABASE
});


getAllEmployees = function(callback) {
  var sql = "SELECT DISTINCT employee.`Employee ID`, concat(employee.`First Name`, ' ',employee.`Last Name`) as `Employee Name`, '' as `Enclosure Name`, shop.`Name` as `Shop Name`, employee.`Job Desciption`, DATE_FORMAT(employee.`Hire Date`, '%m/%d/%Y') as `Hire Date`, employee.`Shifts`, employee.`Salary` "
          + "FROM employee, shop "
          + "WHERE employee.`Shop ID` = shop.`Shop ID` "
          + "AND employee.`Enclosure ID` IS NULL "

          + "UNION ALL "

          + "SELECT DISTINCT employee.`Employee ID`, concat(employee.`First Name`, ' ',employee.`Last Name`) as `Employee Name`, enclosure.`Name` as `Enclosure Name`, '' as `Shop Name`, employee.`Job Desciption`, DATE_FORMAT(employee.`Hire Date`, '%m/%d/%Y') as `Hire Date`, employee.`Shifts`, employee.`Salary` "
          + "FROM enclosure, employee "
           + "WHERE employee.`Enclosure ID` = enclosure.`Enclosure` "
          + "AND employee.`Shop ID` IS NULL "
          
          + "UNION ALL "
			
          + "SELECT DISTINCT employee.`Employee ID`, concat(employee.`First Name`, ' ',employee.`Last Name`) as `Employee Name`, enclosure.`Name` as `Enclosure Name`, shop.`Name` as `Shop Name`, employee.`Job Desciption`, DATE_FORMAT(employee.`Hire Date`, '%m/%d/%Y') as `Hire Date`, employee.`Shifts`, employee.`Salary` "
          + "FROM enclosure, employee, shop "
          + "WHERE employee.`Enclosure ID` IS NOT NULL AND employee.`Shop ID` IS NOT NULL AND employee.`Enclosure ID` = enclosure.`Enclosure` AND employee.`Shop ID` = shop.`Shop ID` "
          
          + "UNION ALL "
          
          + "SELECT DISTINCT employee.`Employee ID`, concat(employee.`First Name`, ' ',employee.`Last Name`) as `Employee Name`, '' as `Enclosure Name`, '' as `Shop Name`, employee.`Job Desciption`, DATE_FORMAT(employee.`Hire Date`, '%m/%d/%Y') as `Hire Date`, employee.`Shifts`, employee.`Salary` "
          + "FROM enclosure, employee, shop "
          + "WHERE employee.`Enclosure ID` IS NULL AND employee.`Shop ID` IS NULL "

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

getAllAnimal = function(callback){

    var sql = "Select animals.`Animal ID`, exhibit.Description as `Exhibit Name`, animals.`Name` as `Animal Name`, animals.`Description`, `diet type`.`Name` as `Diet Type`, `animal type`.`Name` as `Animal Type`, animals.`Age`, animals.`Weight`, animals.`Height`, animals.`Gender`"
            + "FROM animals, exhibit, `diet type`, `animal type` "
            + "WHERE animals.`Exhibit ID` = exhibit.`Exhibit ID` AND animals.`Diet Type ID` = `diet type`.`Diet Type ID` AND animals.`Animal Type ID` = `animal type`.`Animal Type ID` "

            + "Order By `Animal ID` "


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

module.exports.getAllAnimal =  getAllAnimal

getAnimalByID = function(data, callback) {
    //we have to use backticks " ` " when wanting to select columns with spaces in their name
    var sql = "SELECT * from animals WHERE `Animal ID`=?"
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        // make the query
        connection.query(sql, data["Animal ID"], function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
}
module.exports.getAnimalByID = getAnimalByID

deleteAnimalByID = function(data, callback){
    var sql = "DELETE from animals "
        + "WHERE `Animal ID` = ?"
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        // make the query
        connection.query(sql, data['Animal ID'], function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
}

module.exports.deleteAnimalByID = deleteAnimalByID

getAllExhibit = function(callback){
    var sql = "SELECT exhibit.`Exhibit ID`, exhibit.`Description`"
        +"FROM `Exhibit`;"



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

module.exports.getAllExhibit =  getAllExhibit

deleteExhibitByID = function(data, callback){
    var sql = "DELETE from exhibit "
        + "WHERE `Exhibit ID` = ?"
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        // make the query
        connection.query(sql, data['Exhibit ID'], function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
}

module.exports.deleteExhibitByID = deleteExhibitByID

getAllEnclosure = function(callback){
    var sql = "Select enclosure.`Enclosure` as `Enclosure ID`, exhibit.`Description` as `Exhibit Name`, enclosure.`Name` as `Enclosure Name`, enclosure.`Description`, enclosure.`Location`, enclosure.`Capacity`, enclosure.`Feeding Allowed`"
        +"FROM enclosure, exhibit "
        +"WHERE enclosure.`Exhibit ID` = exhibit.`Exhibit ID`;"




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

module.exports.getAllEnclosure =  getAllEnclosure

deleteEnclosureByID = function(data, callback){
    var sql = "DELETE from enclosure "
        + "WHERE `Enclosure` = ?"
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        // make the query
        connection.query(sql, data['Enclosure'], function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
}

module.exports.deleteEnclosureByID = deleteEnclosureByID

getAllAnimalTypes = function(callback){
    var sql = "Select * From `animal type`"


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

module.exports.getAllAnimalTypes =  getAllAnimalTypes

deleteAnimalTypesByID = function(data, callback){
    var sql = "DELETE from `animal type` "
        + "WHERE `Animal Type ID` = ?"
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        // make the query
        connection.query(sql, data['Animal Type ID'], function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
}

module.exports.deleteAnimalTypesByID = deleteAnimalTypesByID

getAllAnimalDietTypes = function(callback){
    var sql = "SELECT * FROM `diet type` "

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

module.exports.getAllAnimalDietTypes =  getAllAnimalDietTypes

deleteAnimalDietTypesByID = function(data, callback){
    var sql = "DELETE from `diet type` "
        + "WHERE `Diet Type ID` = ?"
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        // make the query
        connection.query(sql, data['Diet Type ID'], function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
}

module.exports.deleteAnimalDietTypesByID = deleteAnimalDietTypesByID


getIDAndNameOfExhibit = function(callback){
    var sql = "SELECT `Exhibit ID`, `Description` "
            + "FROM exhibit";
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

module.exports.getIDAndNameOfExhibit = getIDAndNameOfExhibit

getIDAndNameOfDietType = function(callback){
    var sql = "SELECT `Diet Type ID`, `Name` "
            + "FROM `diet type` ";
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

module.exports.getIDAndNameOfDietType = getIDAndNameOfDietType

getIDAndNameOfAnimalType = function(callback){
    var sql = "SELECT `Animal Type ID`, `Name` "
            + "FROM `animal type` ";
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

module.exports.getIDAndNameOfAnimalType = getIDAndNameOfAnimalType

editAnimalByID = function(data, id, callback){
    var sql = "UPDATE animals set ? WHERE `Animal ID` = ? "

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

module.exports.editAnimalByID = editAnimalByID

insertAnimal = function(data, callback){
    var sql = "INSERT INTO animals SET ?"
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

module.exports.insertAnimal = insertAnimal


insertAnimalType = function(data, callback){
    var sql = "INSERT INTO `animal type` SET ?"
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

module.exports.insertAnimalType = insertAnimalType

insertAnimalDietType = function(data, callback){
    var sql = "INSERT INTO `diet type` SET ?"
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

module.exports.insertAnimalDietType = insertAnimalDietType

insertExhibit = function(data, callback){
    var sql = "INSERT INTO exhibit SET ?"
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

module.exports.insertExhibit = insertExhibit


insertEnclosure = function(data, callback){
    var sql = "INSERT INTO enclosure SET ?"
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

module.exports.insertEnclosure = insertEnclosure

getEnclosureByID = function(data, callback) {
    //we have to use backticks " ` " when wanting to select columns with spaces in their name
    var sql = "SELECT * from enclosure WHERE `Enclosure`=?"
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        // make the query
        connection.query(sql, data["Enclosure"], function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
}
module.exports.getEnclosureByID = getEnclosureByID


editEnclosureByID = function(data, id, callback){
    var sql = "UPDATE enclosure set ? WHERE `Enclosure` = ? "

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

module.exports.editEnclosureByID = editEnclosureByID