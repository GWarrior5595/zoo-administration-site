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

  app.get("/employees", isLoggedIn, function(req,res){
    res.render("employee.html");
  });

  app.get("/animals", isLoggedIn, function(req,res){
    res.render("animals.html");
  });

  app.get("/sales", isLoggedIn, function(req,res){
    res.render("sales.html");
  });

    app.get("/check", isLoggedIn, function(req,res){
        res.render("check.html");
    });



  // LOGOUT
  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

// QUERIES WITH BUTTONS
    app.post('/allEmployees', isLoggedIn, function(req, res){
        db.getAllEmployees(function(err, data){
            if(err) {console.log("error"); return;}
            else{
                res.send(data);
            }
        });
    });

    app.post('/allOrders', isLoggedIn, function(req, res){
        db.getAllOrders(function(err, data){
            if(err) {console.log("error"); return;}
            else{
                res.send(data);
            }
        });
    });

    app.post('/getRevenue', isLoggedIn, function(req, res){
        db.getRevenueOfAllOrders(function(err, data){
            if(err) {console.log("error"); return;}
            else{
                res.send(data);
            }
        });
    });

    app.post('/searchEmployeeByID', isLoggedIn, function(req, res){
        db.getEmployeeByID(req.body, function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send(data);
            }
        });
    });

    app.post('/getIDAndNameOfShops', isLoggedIn, function(req, res){
        db.getIDAndNameOfShops(function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send(data);
            }
        });
    });

    app.post('/getAllOrdersFromDate', isLoggedIn, function(req, res){
        db.getAllOrdersFromDate(req.body, function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send(data);
            }
        });
    });

    app.post('/getTotalRevenueByShopTypeID', isLoggedIn, function(req, res){
        db.getTotalRevenueByShopTypeID(req.body, function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send(data);
            }
        })
    })

    app.post('/getAllOrdersFromDateWithDonations', isLoggedIn, function(req, res){
        db.getAllOrdersFromDateWithDonations(req.body, function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send(data);
            }
        })
    })

    app.post('/getTotalOrderNumberByShopTypeID', isLoggedIn, function(req, res){
        db.getTotalOrderNumberByShopTypeID(req.body, function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send(data);
            }
        })
    })

    app.post('/getTotalRevenueFromDateByShopTypeID', isLoggedIn, function(req, res){
        db.getTotalRevenueFromDateByShopTypeID(req.body, function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send(data);
            }
        })
    })

    app.post('/getTotalOrderNumberFromDateByShopID', isLoggedIn, function(req, res){
        db.getTotalOrderNumberFromDateByShopID(req.body, function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send(data);
            }
        })
    })

    app.post('/getTotalOrderNumberByShopID', isLoggedIn, function(req, res){
        db.getTotalOrderNumberByShopID(req.body, function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send(data);
            }
        })
    })

    app.post('/getAllShops', isLoggedIn, function(req, res){
        db.getAllShops(function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send(data);
            }
        })
    })

    app.post('/getAllShopTypes', isLoggedIn, function(req, res){
        db.getAllShopTypes(function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send(data);
            }
        })
    })

    app.post('/addEmployee', isLoggedIn, function(req, res){
        db.insertEmployee(req.body, function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send('User added to database with ID: ' + data.insertId);
            }
        });
    });

    app.post('/editEmployeeByID/:id', isLoggedIn, function(req, res){
        db.editEmployeeByID(req.body, req.params.id, function(err, data){
            if(err) {console.log("error"); return;}
            else{
                 res.send('User edited to database');
            }
        });
    });

    app.post('/deleteEmployee', isLoggedIn, function(req, res){
        db.deleteEmployeeByID(req.body, function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send('User deleted from database');
            }
        });
    });

    app.post('/getIDAndNameOfEnclosures', isLoggedIn, function(req, res){
        db.getIDAndNameOfEnclosures(function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send(data);
            }
        });
    });

    app.post('/getAllAnimal', function(req, res){
        db.getAllAnimal(function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send(data);
            }
        })
    })

    app.post('/searchAnimalByID', function(req, res){
        db.getAnimalByID(req.body, function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send(data);
            }
        });
    });

    app.post('/deleteAnimal', function(req, res){
        db.deleteAnimalByID(req.body, function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send('Animal deleted from database');
            }
        });
    });

    app.post('/deleteExhibit', function(req, res){
        db.deleteExhibitByID(req.body, function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send('Exhibit deleted from database');
            }
        });
    });

    app.post('/deleteEnclosure', function(req, res){
        db.deleteEnclosureByID(req.body, function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send('Enclosure deleted from database');
            }
        });
    });

    app.post('/deleteAnimalType', function(req, res){
        db.deleteAnimalTypesByID(req.body, function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send('Animal Type deleted from database');
            }
        });
    });

    app.post('/deleteAnimalDietType', function(req, res){
        db.deleteAnimalDietTypesByID(req.body, function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send('Animal Diet Type deleted from database');
            }
        });
    });




    app.post('/getAllExhibit', function(req, res){
        db.getAllExhibit(function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send(data);
            }
        })
    })

    app.post('/getAllEnclosure', function(req, res){
        db.getAllEnclosure(function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send(data);
            }
        })
    })

    app.post('/getAllAnimalTypes', function(req, res){
        db.getAllAnimalTypes(function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send(data);
            }
        })
    })


    app.post('/getAllAnimalDietTypes', function(req, res){
        db.getAllAnimalDietTypes(function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send(data);
            }
        })
    })

    app.post('/searchAnimalByID', isLoggedIn, function(req, res){
        db.getEmployeeByID(req.body, function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send(data);
            }
        });
    });

    app.post('/getIDAndNameOfExhibit', isLoggedIn, function(req, res){
        db.getIDAndNameOfExhibit(function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send(data);
            }
        });
    });

    app.post('/getIDAndNameOfDietType', isLoggedIn, function(req, res){
        db.getIDAndNameOfDietType(function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send(data);
            }
        });
    });

    app.post('/getIDAndNameOfAnimalType', isLoggedIn, function(req, res){
        db.getIDAndNameOfAnimalType(function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send(data);
            }
        });
    });

    app.post('/editAnimalByID/:id', isLoggedIn, function(req, res){
        db.editAnimalByID(req.body, req.params.id, function(err, data){
            if(err) {console.log("error"); return;}
            else{
                res.send('Animal edited to database');
            }
        });
    });

    app.post('/addAnimal', isLoggedIn, function(req, res){
        db.insertAnimal(req.body, function(err, data){
            if(err) {console.log("error"); return;}
            else{
                //format data in here
                res.send('Animal added to database with ID: ' + data.insertId);
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
    res.status(404).render("404page.html");
    
  })
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}
