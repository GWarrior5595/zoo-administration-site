var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-03.cleardb.net',
  user: 'b3a58478f963a6',
  password: 'e4081158',
  database: 'heroku_db65f8e9326be4b'
});

connection.connect();

connection.query('SELECT * from < table name >', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

connection.end();