var db = require('../server/db.js') 

module.exports = function(app, passport) {

// normal routes
  // show the home page
  app.get('/', function(req, res) {
      res.render('login.html');
  });

  app.get('/index', isLoggedIn, function(req, res) {
    res.render('index.html', {
        user : req.user
    });
  });

  app.get("/navbar", isLoggedIn, function(req, res){
      res.render("navbar.html");
  });

  app.get("/page1", isLoggedIn, function(req,res){
    res.render("page1.html");
  });

  app.get("/page2", isLoggedIn, function(req,res){
    res.render("page2.html");
  });

  app.get("/page3", isLoggedIn, function(req,res){
    res.render("page3.html");
  });

  app.get("/page4", isLoggedIn, function(req,res){
    res.render("page4.html");
  });

  app.get("/page5", isLoggedIn, function(req,res){
    res.render("page5.html");
  });

  // LOGOUT
  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

// QUERIES WITH BUTTONS
    app.post('/allEmployees', function(req, res){
        db.getAllEmployees(function(err, data){
            if(err) {console.log("error"); return;}
            else{
                res.send(data);
            }
        });
    });

    app.post('/searchEmployees', function(req, res){
        db.getEmployeeByFirstName(req.body, function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send(data);
            }
        });
    });

// AUTHENTICATE
  // show the login form
  app.get('/login', function(req, res) {
      res.render('login.html', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/index', // redirect to the homepage
      failureRedirect : '/login', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));

  // SIGNUP
  // show the signup form
  app.get('/signup', function(req, res) {
      res.render('signup', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/login', // redirect to homepage
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));

  app.use(function (req, res, next) {
    res.status(404).send("Sorry! Page not found!")
  })
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}
