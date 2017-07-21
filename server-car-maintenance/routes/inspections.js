var express = require('express');
var service = require('../services/car-service');
var carService = service.carService;
var router = express.Router();

router.get('/', function(req, res, next) {
    carService.getAllInspections(req, res, next);
});

router.get('/:id', function(req, res, next) {
    carService.getOneInspection(req, res, next);
});

router.post('/', function (req,res, next) {
    carService.createInspection(req, res, next);
});

router.put('/:id', function (req,res, next) {
    carService.editInspection(req, res, next);
});

router.delete('/:id', function (req,res, next) {
    carService.deleteInspection(req, res, next);
});


module.exports = router;
