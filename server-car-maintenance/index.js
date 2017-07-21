var express = require('express');
var logger = require('morgan');
var mysql = require('mysql');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
const nJwt = require('njwt');

var app = express();

//auth

const SECRET_KEY = 'CarMaintenanceSecret';
var validate = function (decoded, request, callback) {
  console.log("Inside validate function");
  var token = request.headers.authorization;
  var verifiedJwt = nJwt.verify(token, SECRET_KEY);
  if (!verifiedJwt) {
    return callback(null, false);
  }
  else {
    return callback(null, true);
  }
};

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var appRoutes = require('./routes/index');
var carRoutes = require('./routes/cars');
var inspectionRoutes = require('./routes/inspections');
var tireRotationRoutes = require('./routes/tire-rotations');
var oilChangeRoutes = require('./routes/oil-changes');
var otherEntryRoutes = require('./routes/other-entries');

//mySQL db
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'password',
    database : 'ketodb'
});
connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n");
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//CORS
app.use(cors());


//routes
app.use('/', appRoutes);
app.use('/cars', carRoutes);
app.use('/oilChanges', oilChangeRoutes);
app.use('/inspections', inspectionRoutes);
app.use('/tireRotations', tireRotationRoutes);
app.use('/otherEntries', otherEntryRoutes);

//logging
app.use(logger('dev'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

module.exports = app;