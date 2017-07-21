var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var dbConfig = require('../config/config');
var connection = mysql.createConnection({
    host     : dbConfig.development.host,
    user     : dbConfig.development.username,
    password : dbConfig.development.password,
    database : dbConfig.development.database
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CarMaintenance' });
});

module.exports = router;
