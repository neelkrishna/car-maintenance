var express = require('express');
var service = require('../services/car-service');
var carService = service.carService;
var router = express.Router();

router.get('/', function(req, res, next) {
    carService.getAllCars(req, res, next);
});

router.get('/:id', function(req, res, next) {
    carService.getOneCar(req, res, next);
});

router.post('/', function (req, res, next) {
    carService.createCar(req, res, next);
});

router.post('/:carId/:tireRotationId', function (req, res, next) {
    carService.addTireRotationToCar(req, res, next);
});

router.get('/:carId/tireRotations', function (req, res, next) {
    carService.getTireRotationsForCar(req, res, next);
});

router.delete('/:carId/:tireRotationId',   function (req,res, next) {
    carService.removeTireRotationFromCar(req, res, next);
});

router.post('/:carId/:inspectionId', function (req, res, next) {
    carService.addInspectionToCar(req, res, next);
});

router.get('/:carId/inspections', function (req, res, next) {
    carService.getInspectionsForCar(req, res, next);
});

router.delete('/:carId/:inspectionId',   function (req,res, next) {
    carService.removeInspectionFromCar(req, res, next);
});

router.post('/:carId/:tireRotationId', function (req, res, next) {
    carService.addTireRotationToCar(req, res, next);
});

router.get('/:carId/tireRotations', function (req, res, next) {
    carService.getTireRotationsForCar(req, res, next);
});

router.delete('/:carId/:tireRotationId',   function (req,res, next) {
    carService.removeTireRotationFromCar(req, res, next);
});

router.post('/:carId/:otherEntryId', function (req, res, next) {
    carService.addOtherEntryToCar(req, res, next);
});

router.get('/:carId/otherEntries', function (req, res, next) {
    carService.getOtherEntriesForCar(req, res, next);
});

router.delete('/:carId/:otherEntryId',   function (req,res, next) {
    carService.removeOtherEntryFromCar(req, res, next);
});

router.delete('/:id', function (req,res, next) {
    carService.deleteCar(req, res, next);
});

router.put('/:id', function (req,res, next) {
    carService.editCar(req, res, next);
});

module.exports = router;
