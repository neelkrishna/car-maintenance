var express = require('express');
var service = require('../services/car-service');
var carService = service.carService;
var router = express.Router();

router.get('/', function(req, res, next) {
    carService.getAllOtherEntries(req, res, next);
});

router.get('/:id', function(req, res, next) {
    carService.getOneOtherEntry(req, res, next);
});

router.post('/', function (req,res, next) {
    carService.createOtherEntry(req, res, next);
});

router.put('/:id', function (req,res, next) {
    carService.editOtherEntry(req, res, next);
});

router.delete('/:id', function (req,res, next) {
    carService.deleteOtherEntry(req, res, next);
});


module.exports = router;
