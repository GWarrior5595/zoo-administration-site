var express = require("express");
var engines = require('consolidate');
var app = express();
//var mysql = require('mysql');

// var connection = mysql.createConnection({
//   host: 'us-cdbr-iron-east-03.cleardb.net',
//   user: 'b3a58478f963a6',
//   password: 'e4081158',
//   database: 'heroku_db65f8e9326be4b'
// });

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

//connection.connect();

app.get('/', function(request, response) {
  response.render('pages/login');
  // connection.query('SELECT * from animals', function(err, rows, fields) {
  //     if (err) {
  //       console.log('error: ', err);
  //       throw err;
  //     }
  //     response.send(['Hello World!!!! HOLA MUNDO!!!!', rows]);
  //   });

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});