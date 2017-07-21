var express = require('express');
var service = require('../services/car-service');
var carService = service.carService;
var router = express.Router();

router.get('/', function(req, res, next) {
    carService.getAllTireRotations(req, res, next);
});

router.get('/:id', function(req, res, next) {
    carService.getOneTireRotation(req, res, next);
});

router.post('/', function (req,res, next) {
    carService.createTireRotation(req, res, next);
});

router.put('/:id', function (req,res, next) {
    carService.editTireRotation(req, res, next);
});

router.delete('/:id', function (req,res, next) {
    carService.deleteTireRotation(req, res, next);
});


module.exports = router;
