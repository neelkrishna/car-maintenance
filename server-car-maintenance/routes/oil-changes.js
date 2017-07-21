var express = require('express');
var service = require('../services/car-service');
var carService = service.carService;
var router = express.Router();

router.get('/', function(req, res, next) {
    carService.getAllOilChanges(req, res, next);
});

router.get('/:id', function(req, res, next) {
    carService.getOneOilChange(req, res, next);
});

router.post('/', function (req,res, next) {
    carService.createOilChange(req, res, next);
});

router.put('/:id', function (req,res, next) {
    carService.editOilChange(req, res, next);
});

router.delete('/:id', function (req,res, next) {
    carService.deleteOilChange(req, res, next);
});


module.exports = router;
