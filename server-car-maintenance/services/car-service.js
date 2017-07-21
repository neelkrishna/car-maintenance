
var models = require('../models');
var mysql = require('mysql');
var express = require('express');
var service = require('./response-service');
var responseService = service.responseService;
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('sequelize');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var dbConfig = require('../config/config');
var connection = mysql.createConnection({
    host     : dbConfig.development.host,
    user     : dbConfig.development.username,
    password : dbConfig.development.password,
    database : dbConfig.development.database
});

exports.carService = {
    getAllCars: function(req, res, next) {
        return models.sequelize.transaction(function (t) {
            return models.Car.findAll()
            .then(function (cars) {
                res.send(responseService.generateResponse(cars, 200, {}));
            })
            .catch(function (error){
                res.send(responseService.generateResponse(error, 404, {message: "Cars not found", level: "E"}));
            });
        })
        .then(function(result){
            console.log("success: " + result);
        })
        .catch(function(err){
            console.log("failure: " + err);
            throw new Error();
        });
    },
    getOneCar: function(req, res, next) {
        return models.sequelize.transaction(function (t) {
            return models.Car.findById(req.params.id)
                .then(function (car) {
                    res.send(responseService.generateResponse(car, 200, {}));
                })
                .catch(function (error){
                    res.send(responseService.generateResponse(error, 404, {message:"Car not found", level:"E"}));
                });
             })
        .then(function(result){
            console.log("success: " + result);
        })
        .catch(function(err){
            console.log("failure: " + err);
            throw new Error();
        });
    },
    createCar: function (req, res, next) {
        return models.sequelize.transaction(function (t) {
            return models.Car.create(req.body)
                .then(function (newCar) {
                    for(let carTimeId of req.body.carTimeIds){
                            var currentCarTimeId = parseInt(carTimeId);
                            connection.query('INSERT into CarCarTime values(now(), now(), '
                            + currentCarTimeId + ', ' + newCar.id + ')', function(insertErr, rows) {
                            if (!insertErr) {
                                console.log('worked');
                            }else{
                                console.log('Error.  ' + insertErr);
                            }
                        });
                    }
                    res.send(responseService.generateResponse(newCar, 200, {message:"Car created", level: "I"}));
                })
                .catch(function (error){
                    res.send(responseService.generateResponse(error, 500, {message: "Car could not be created", level: "E"}));
                });
            })
        .then(function(result){
            console.log("success: " + result);
        })
        .catch(function(err){
            console.log("failure: " + err);
            throw new Error();
        });
            
    },
    addOilChangeToCar: function(req, res, next){
        return models.sequelize.transaction(function (t) {
            return connection.query('SELECT * from CarOilChange where carId = "' + req.params.carId + '" AND oilChangeId = "' + req.params.oilChangeId + '"', function(selectErr, rows) {
                if (!selectErr) {
                    if(rows.length == 0){
                        var q = connection.query('INSERT into CarOilChange VALUES (now(), now(), '
                            + req.params.carId + ', ' + req.params.oilChangeId + ')' ,
                            function(err, rows, fields) {
                            if (!err) {
                                console.log(q.sql);
                                res.send(responseService.generateResponse(rows, 200, {message: "Oil Change added to car", level: "I"}));
                            }else{
                                res.send(responseService.generateResponse(err, 500, {message:"Oil Change could not be added to car", level:"E"}));
                                console.log('Error while performing Insert.  ' + q.sql + " | " + err);
                            }

                        });
                        console.log('here are rows ', rows)
                    }else{
                        res.send(responseService.generateResponse("", 400, {message:"Oil Change already belongs to car", level:"W"}));
                    }

                }else{
                    res.send(responseService.generateResponse(selectErr, 500, {message:"Oil Change could not be added to car", level:"E"}));
                    console.log('Error while performing Select.  ' + selectErr);
                }
            });
        })
        .then(function(result){
            console.log("success: " + result);
        })
        .catch(function(err){
            console.log("failure: " + err);
            throw new Error();
        });
    },
    getOilChangesForCar: function (req, res, next) {
        return models.sequelize.transaction(function (t) {
            connection.query('SELECT * from CarOilChange where carId = "' + req.params.carId + '"', function(selectErr, rows) {
                if (!selectErr) {
                    var oilChangeIds = []
                    for(var i = 0; i < rows.length; i++){
                        oilChangeIds[i] = rows[i].oilChangeId;
                    }
                    oilChangeQuery = '';
                    for(var i = 0; i < oilChangeIds.length; i++){
                        if(i != oilChangeIds.length - 1){
                            oilChangeQuery += oilChangeIds[i] + " OR id = ";
                        }else{
                            oilChangeQuery += oilChangeIds[i];
                        }
                    }
                    if(oilChangeQuery == ""){
                        oilChangeQuery = 0;
                    }
                    var q = connection.query('SELECT * from OilChanges where id = ' + oilChangeQuery + '', 
                        function(err, selectRows) {
                        res.send(responseService.generateResponse(selectRows, 200, {}));
                    });
                }else{
                    res.send(responseService.generateResponse(selectErr, 500, {message: "Oil Changes for car not loaded", level:"E"}));
                    console.log('Error while performing Select.  ' + selectErr);
                }
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },

    removeOilChangeFromCar: function(req, res, next) {
        return models.sequelize.transaction(function (t) {
            connection.query('SELECT * from CarOilChange where carId = '
                + req.params.carId + ' AND oilChangeId = ' + req.params.oilChangeId
                + '', function(selectErr, rows) {
                if (!selectErr) {
                    if(rows.length == 1){
                        var carId = req.params.carId;
                        var oilChangeId = req.params.oilChangeId;
                        var q = connection.query('DELETE from CarOilChange WHERE CarId = '
                            + carId + ' AND OilChangeId = ' + oilChangeId
                            + '' , function(err, rows, fields) {
                            if (!err) {
                                console.log(q.sql);
                                res.send(responseService.generateResponse(rows, 200, {message:"Oil Change deleted from car", level:"I"}));
                            }else{
                                res.send(responseService.generateResponse(err, 500, {message:"Relationship not found", level:"E"}));
                                console.log(500, 'Error while performing Delete.  ' + q.sql + " | " + err);
                            }

                        });
                        console.log('here are rows ', rows)
                    }else{
                        res.send(responseService.generateResponse("", 400, {message:"Server error", level:"E"}));
                    }

                }else{
                    console.log('Error while performing Select.  ' + selectErr);
                    res.send(responseService.generateResponse(selectErr, 500, {message:"Oil Change could not be deleted from car", level:"E"}));
                }
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    addInspectionToCar: function(req, res, next){
        return models.sequelize.transaction(function (t) {
            return connection.query('SELECT * from CarInspection where carId = "' + req.params.carId + '" AND inspectionId = "' + req.params.inspectionId + '"', function(selectErr, rows) {
                if (!selectErr) {
                    if(rows.length == 0){
                        var q = connection.query('INSERT into CarInspection VALUES (now(), now(), '
                            + req.params.carId + ', ' + req.params.inspectionId + ')' ,
                            function(err, rows, fields) {
                            if (!err) {
                                console.log(q.sql);
                                res.send(responseService.generateResponse(rows, 200, {message: "Inspection added to car", level: "I"}));
                            }else{
                                res.send(responseService.generateResponse(err, 500, {message:"Inspection could not be added to car", level:"E"}));
                                console.log('Error while performing Insert.  ' + q.sql + " | " + err);
                            }

                        });
                        console.log('here are rows ', rows)
                    }else{
                        res.send(responseService.generateResponse("", 400, {message:"Inspection already belongs to car", level:"W"}));
                    }

                }else{
                    res.send(responseService.generateResponse(selectErr, 500, {message:"Inspection could not be added to car", level:"E"}));
                    console.log('Error while performing Select.  ' + selectErr);
                }
            });
        })
        .then(function(result){
            console.log("success: " + result);
        })
        .catch(function(err){
            console.log("failure: " + err);
            throw new Error();
        });
    },
    getInspectionsForCar: function (req, res, next) {
        return models.sequelize.transaction(function (t) {
            connection.query('SELECT * from CarInspection where carId = "' + req.params.carId + '"', function(selectErr, rows) {
                if (!selectErr) {
                    var inspectionIds = []
                    for(var i = 0; i < rows.length; i++){
                        inspectionIds[i] = rows[i].inspectionId;
                    }
                    inspectionQuery = '';
                    for(var i = 0; i < inspectionIds.length; i++){
                        if(i != inspectionIds.length - 1){
                            inspectionQuery += inspectionIds[i] + " OR id = ";
                        }else{
                            inspectionQuery += inspectionIds[i];
                        }
                    }
                    if(inspectionQuery == ""){
                        inspectionQuery = 0;
                    }
                    var q = connection.query('SELECT * from Inspections where id = ' + inspectionQuery + '', 
                        function(err, selectRows) {
                        res.send(responseService.generateResponse(selectRows, 200, {}));
                    });
                }else{
                    res.send(responseService.generateResponse(selectErr, 500, {message: "Inspections for car not loaded", level:"E"}));
                    console.log('Error while performing Select.  ' + selectErr);
                }
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },

    removeInspectionFromCar: function(req, res, next) {
        return models.sequelize.transaction(function (t) {
            connection.query('SELECT * from CarInspection where carId = '
                + req.params.carId + ' AND inspectionId = ' + req.params.inspectionId
                + '', function(selectErr, rows) {
                if (!selectErr) {
                    if(rows.length == 1){
                        var carId = req.params.carId;
                        var inspectionId = req.params.inspectionId;
                        var q = connection.query('DELETE from CarInspection WHERE CarId = '
                            + carId + ' AND InspectionId = ' + inspectionId
                            + '' , function(err, rows, fields) {
                            if (!err) {
                                console.log(q.sql);
                                res.send(responseService.generateResponse(rows, 200, {message:"Inspection deleted from car", level:"I"}));
                            }else{
                                res.send(responseService.generateResponse(err, 500, {message:"Relationship not found", level:"E"}));
                                console.log(500, 'Error while performing Delete.  ' + q.sql + " | " + err);
                            }

                        });
                        console.log('here are rows ', rows)
                    }else{
                        res.send(responseService.generateResponse("", 400, {message:"Server error", level:"E"}));
                    }

                }else{
                    console.log('Error while performing Select.  ' + selectErr);
                    res.send(responseService.generateResponse(selectErr, 500, {message:"Inspection could not be deleted from car", level:"E"}));
                }
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    addTireRotationToCar: function(req, res, next){
        return models.sequelize.transaction(function (t) {
            return connection.query('SELECT * from CarTireRotation where carId = "' + req.params.carId + '" AND tireRotationId = "' + req.params.tireRotationId + '"', function(selectErr, rows) {
                if (!selectErr) {
                    if(rows.length == 0){
                        var q = connection.query('INSERT into CarTireRotation VALUES (now(), now(), '
                            + req.params.carId + ', ' + req.params.tireRotationId + ')' ,
                            function(err, rows, fields) {
                            if (!err) {
                                console.log(q.sql);
                                res.send(responseService.generateResponse(rows, 200, {message: "Tire Rotation added to car", level: "I"}));
                            }else{
                                res.send(responseService.generateResponse(err, 500, {message:"Tire Rotation could not be added to car", level:"E"}));
                                console.log('Error while performing Insert.  ' + q.sql + " | " + err);
                            }

                        });
                        console.log('here are rows ', rows)
                    }else{
                        res.send(responseService.generateResponse("", 400, {message:"Tire Rotation already belongs to car", level:"W"}));
                    }

                }else{
                    res.send(responseService.generateResponse(selectErr, 500, {message:"Tire Rotation could not be added to car", level:"E"}));
                    console.log('Error while performing Select.  ' + selectErr);
                }
            });
        })
        .then(function(result){
            console.log("success: " + result);
        })
        .catch(function(err){
            console.log("failure: " + err);
            throw new Error();
        });
    },
    getTireRotationsForCar: function (req, res, next) {
        return models.sequelize.transaction(function (t) {
            connection.query('SELECT * from CarTireRotation where carId = "' + req.params.carId + '"', function(selectErr, rows) {
                if (!selectErr) {
                    var tireRotationIds = []
                    for(var i = 0; i < rows.length; i++){
                        tireRotationIds[i] = rows[i].tireRotationId;
                    }
                    tireRotationQuery = '';
                    for(var i = 0; i < tireRotationIds.length; i++){
                        if(i != tireRotationIds.length - 1){
                            tireRotationQuery += tireRotationIds[i] + " OR id = ";
                        }else{
                            tireRotationQuery += tireRotationIds[i];
                        }
                    }
                    if(tireRotationQuery == ""){
                        tireRotationQuery = 0;
                    }
                    var q = connection.query('SELECT * from TireRotations where id = ' + tireRotationQuery + '', 
                        function(err, selectRows) {
                        res.send(responseService.generateResponse(selectRows, 200, {}));
                    });
                }else{
                    res.send(responseService.generateResponse(selectErr, 500, {message: "Tire Rotations for car not loaded", level:"E"}));
                    console.log('Error while performing Select.  ' + selectErr);
                }
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },

    removeTireRotationFromCar: function(req, res, next) {
        return models.sequelize.transaction(function (t) {
            connection.query('SELECT * from CarTireRotation where carId = '
                + req.params.carId + ' AND tireRotationId = ' + req.params.tireRotationId
                + '', function(selectErr, rows) {
                if (!selectErr) {
                    if(rows.length == 1){
                        var carId = req.params.carId;
                        var tireRotationId = req.params.tireRotationId;
                        var q = connection.query('DELETE from CarTireRotation WHERE CarId = '
                            + carId + ' AND TireRotationId = ' + tireRotationId
                            + '' , function(err, rows, fields) {
                            if (!err) {
                                console.log(q.sql);
                                res.send(responseService.generateResponse(rows, 200, {message:"Tire Rotation deleted from car", level:"I"}));
                            }else{
                                res.send(responseService.generateResponse(err, 500, {message:"Relationship not found", level:"E"}));
                                console.log(500, 'Error while performing Delete.  ' + q.sql + " | " + err);
                            }

                        });
                        console.log('here are rows ', rows)
                    }else{
                        res.send(responseService.generateResponse("", 400, {message:"Server error", level:"E"}));
                    }

                }else{
                    console.log('Error while performing Select.  ' + selectErr);
                    res.send(responseService.generateResponse(selectErr, 500, {message:"Tire Rotation could not be deleted from car", level:"E"}));
                }
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    addOtherEntryToCar: function(req, res, next){
        return models.sequelize.transaction(function (t) {
            return connection.query('SELECT * from CarOtherEntry where carId = "' + req.params.carId + '" AND otherEntryId = "' + req.params.otherEntryId + '"', function(selectErr, rows) {
                if (!selectErr) {
                    if(rows.length == 0){
                        var q = connection.query('INSERT into CarOtherEntry VALUES (now(), now(), '
                            + req.params.carId + ', ' + req.params.otherEntryId + ')' ,
                            function(err, rows, fields) {
                            if (!err) {
                                console.log(q.sql);
                                res.send(responseService.generateResponse(rows, 200, {message: "Other Entry added to car", level: "I"}));
                            }else{
                                res.send(responseService.generateResponse(err, 500, {message:"Other Entry could not be added to car", level:"E"}));
                                console.log('Error while performing Insert.  ' + q.sql + " | " + err);
                            }

                        });
                        console.log('here are rows ', rows)
                    }else{
                        res.send(responseService.generateResponse("", 400, {message:"Other Entry already belongs to car", level:"W"}));
                    }

                }else{
                    res.send(responseService.generateResponse(selectErr, 500, {message:"Other Entry could not be added to car", level:"E"}));
                    console.log('Error while performing Select.  ' + selectErr);
                }
            });
        })
        .then(function(result){
            console.log("success: " + result);
        })
        .catch(function(err){
            console.log("failure: " + err);
            throw new Error();
        });
    },
    getOtherEntrysForCar: function (req, res, next) {
        return models.sequelize.transaction(function (t) {
            connection.query('SELECT * from CarOtherEntry where carId = "' + req.params.carId + '"', function(selectErr, rows) {
                if (!selectErr) {
                    var otherEntryIds = []
                    for(var i = 0; i < rows.length; i++){
                        otherEntryIds[i] = rows[i].otherEntryId;
                    }
                    otherEntryQuery = '';
                    for(var i = 0; i < otherEntryIds.length; i++){
                        if(i != otherEntryIds.length - 1){
                            otherEntryQuery += otherEntryIds[i] + " OR id = ";
                        }else{
                            otherEntryQuery += otherEntryIds[i];
                        }
                    }
                    if(otherEntryQuery == ""){
                        otherEntryQuery = 0;
                    }
                    var q = connection.query('SELECT * from OtherEntrys where id = ' + otherEntryQuery + '', 
                        function(err, selectRows) {
                        res.send(responseService.generateResponse(selectRows, 200, {}));
                    });
                }else{
                    res.send(responseService.generateResponse(selectErr, 500, {message: "Other Entrys for car not loaded", level:"E"}));
                    console.log('Error while performing Select.  ' + selectErr);
                }
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },

    removeOtherEntryFromCar: function(req, res, next) {
        return models.sequelize.transaction(function (t) {
            connection.query('SELECT * from CarOtherEntry where carId = '
                + req.params.carId + ' AND otherEntryId = ' + req.params.otherEntryId
                + '', function(selectErr, rows) {
                if (!selectErr) {
                    if(rows.length == 1){
                        var carId = req.params.carId;
                        var otherEntryId = req.params.otherEntryId;
                        var q = connection.query('DELETE from CarOtherEntry WHERE CarId = '
                            + carId + ' AND OtherEntryId = ' + otherEntryId
                            + '' , function(err, rows, fields) {
                            if (!err) {
                                console.log(q.sql);
                                res.send(responseService.generateResponse(rows, 200, {message:"Other Entry deleted from car", level:"I"}));
                            }else{
                                res.send(responseService.generateResponse(err, 500, {message:"Relationship not found", level:"E"}));
                                console.log(500, 'Error while performing Delete.  ' + q.sql + " | " + err);
                            }

                        });
                        console.log('here are rows ', rows)
                    }else{
                        res.send(responseService.generateResponse("", 400, {message:"Server error", level:"E"}));
                    }

                }else{
                    console.log('Error while performing Select.  ' + selectErr);
                    res.send(responseService.generateResponse(selectErr, 500, {message:"Other Entry could not be deleted from car", level:"E"}));
                }
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    deleteCar: function(req, res, next){
        return models.sequelize.transaction(function (t) {
            models.Car.destroy({where: {id: req.params.id}})
            .then(function (car) {
                res.send(responseService.generateResponse(car, 200, {message:"Car deleted", level:"I"}));
            })
            .catch(function (error){
                res.send(responseService.generateResponse(error, 500, {message:"Car could not be deleted", level:"E"}));
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    editCar: function(req, res, next) {
        return models.sequelize.transaction(function (t) {
            models.Car.find({ where: { id: req.params.id } })
            .then(function(car) {
                if (car) {
                    car.updateAttributes({
                        carName: req.body.carName,
                        calories: req.body.calories,
                        carbs: req.body.carbs,
                        protein: req.body.protein
                    }).then(function () {
                        res.send(responseService.generateResponse(car, 200, {message:"Car updated", level:"I"}));
                    }).catch(function (error) {
                        res.send(responseService.generateResponse(error, 500, {message:"Car could not be updated", level:"E"}));
                    })
                }else{
                    res.send(responseService.generateResponse(car, 404, {message:"Car not found", level:"E"}));
                }
            }).catch(function (error) {
                res.send(responseService.generateResponse(error, 500, {message:"Car could not be updated", level:"E"}));
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    getAllOilChanges: function(req, res, next) {
        return models.sequelize.transaction(function (t) {
            models.OilChange.findAll()
            .then(function(oilChanges) {
                res.send(responseService.generateResponse(oilChanges, 200, {}));
            })
            .catch(function (error){
                console.log(error);
                res.send(responseService.generateResponse(error, 500, {message:"Unable to load oil changes", level:"E"}));
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    getOneOilChange: function(req, res, next) {
        return models.sequelize.transaction(function (t) {
            models.OilChange.findById(req.params.id)
            .then(function (oilChange) {
                res.send(responseService.generateResponse(oilChange, 200, {}));
            })
            .catch(function (error){
                res.send(responseService.generateResponse(error, 404, {message:"Oil Change not found", level:"E"}));
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    createOilChange: function (req, res, next) {
        return models.sequelize.transaction(function (t) {
            models.OilChange.create(req.body)
            .then(function (newOilChange) {
                res.send(responseService.generateResponse(newOilChange, 200, {message:"Oil Change created", level:"I"}));
            })
            .catch(function (error){
                res.send(responseService.generateResponse(error, 500, {message:"Oil Change could not be created", level:"E"}));
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    deleteOilChange: function(req, res, next){
        return models.sequelize.transaction(function (t) {
            models.OilChange.destroy({where: {id: req.params.id}})
            .then(function (oilChange) {
                res.send(responseService.generateResponse(oilChange, 200, {message:"Oil Change deleted", level:"I"}));
            })
            .catch(function (error){
                res.send(responseService.generateResponse(error, 500, {message:"Oil Change could not be deleted", level:"E"}));
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    editOilChange: function(req, res, next) {
        return models.sequelize.transaction(function (t) {
            models.OilChange.find({ where: { id: req.params.id } })
            .then(function(oilChange) {
                if (oilChange) {
                    oilChange.updateAttributes({
                        oilChangeName: req.body.oilChangeName
                    }).then(function () {
                        res.send(responseService.generateResponse(oilChange, 200, {message:"Oil Change updated", level:"I"}));
                    }).catch(function (error) {
                        res.send(responseService.generateResponse(error, 500, {message:"Oil Change could not be updated", level:"E"}));
                    })
                }else{
                    res.send(responseService.generateResponse(oilChange, 404, {message: "Oil Change not found", level:"E"}));
                }
            }).catch(function (error) {
                res.send(responseService.generateResponse(error, 500, {message:"Oil Change could not be updated", level:"E"}));
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    getAllInspections: function(req, res, next) {
        return models.sequelize.transaction(function (t) {
            models.Inspection.findAll()
            .then(function(inspections) {
                res.send(responseService.generateResponse(inspections, 200, {}));
            })
            .catch(function (error){
                console.log(error);
                res.send(responseService.generateResponse(error, 500, {message:"Unable to load inspections", level:"E"}));
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    getOneInspection: function(req, res, next) {
        return models.sequelize.transaction(function (t) {
            models.Inspection.findById(req.params.id)
            .then(function (inspection) {
                res.send(responseService.generateResponse(inspection, 200, {}));
            })
            .catch(function (error){
                res.send(responseService.generateResponse(error, 404, {message:"Inspection not found", level:"E"}));
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    createInspection: function (req, res, next) {
        return models.sequelize.transaction(function (t) {
            models.Inspection.create(req.body)
            .then(function (newInspection) {
                res.send(responseService.generateResponse(newInspection, 200, {message:"Inspection created", level:"I"}));
            })
            .catch(function (error){
                res.send(responseService.generateResponse(error, 500, {message:"Inspection could not be created", level:"E"}));
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    deleteInspection: function(req, res, next){
        return models.sequelize.transaction(function (t) {
            models.Inspection.destroy({where: {id: req.params.id}})
            .then(function (inspection) {
                res.send(responseService.generateResponse(inspection, 200, {message:"Inspection deleted", level:"I"}));
            })
            .catch(function (error){
                res.send(responseService.generateResponse(error, 500, {message:"Inspection could not be deleted", level:"E"}));
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    editInspection: function(req, res, next) {
        return models.sequelize.transaction(function (t) {
            models.Inspection.find({ where: { id: req.params.id } })
            .then(function(inspection) {
                if (inspection) {
                    inspection.updateAttributes({
                        inspectionName: req.body.inspectionName
                    }).then(function () {
                        res.send(responseService.generateResponse(inspection, 200, {message:"Inspection updated", level:"I"}));
                    }).catch(function (error) {
                        res.send(responseService.generateResponse(error, 500, {message:"Inspection could not be updated", level:"E"}));
                    })
                }else{
                    res.send(responseService.generateResponse(inspection, 404, {message: "Inspection not found", level:"E"}));
                }
            }).catch(function (error) {
                res.send(responseService.generateResponse(error, 500, {message:"Inspection could not be updated", level:"E"}));
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    getAllTireRotations: function(req, res, next) {
        return models.sequelize.transaction(function (t) {
            models.TireRotation.findAll()
            .then(function(tireRotations) {
                res.send(responseService.generateResponse(tireRotations, 200, {}));
            })
            .catch(function (error){
                console.log(error);
                res.send(responseService.generateResponse(error, 500, {message:"Unable to load tire rotations", level:"E"}));
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    getOneTireRotation: function(req, res, next) {
        return models.sequelize.transaction(function (t) {
            models.TireRotation.findById(req.params.id)
            .then(function (tireRotation) {
                res.send(responseService.generateResponse(tireRotation, 200, {}));
            })
            .catch(function (error){
                res.send(responseService.generateResponse(error, 404, {message:"Tire Rotation not found", level:"E"}));
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    createTireRotation: function (req, res, next) {
        return models.sequelize.transaction(function (t) {
            models.TireRotation.create(req.body)
            .then(function (newTireRotation) {
                res.send(responseService.generateResponse(newTireRotation, 200, {message:"Tire Rotation created", level:"I"}));
            })
            .catch(function (error){
                res.send(responseService.generateResponse(error, 500, {message:"Tire Rotation could not be created", level:"E"}));
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    deleteTireRotation: function(req, res, next){
        return models.sequelize.transaction(function (t) {
            models.TireRotation.destroy({where: {id: req.params.id}})
            .then(function (tireRotation) {
                res.send(responseService.generateResponse(tireRotation, 200, {message:"Tire Rotation deleted", level:"I"}));
            })
            .catch(function (error){
                res.send(responseService.generateResponse(error, 500, {message:"Tire Rotation could not be deleted", level:"E"}));
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    editTireRotation: function(req, res, next) {
        return models.sequelize.transaction(function (t) {
            models.TireRotation.find({ where: { id: req.params.id } })
            .then(function(tireRotation) {
                if (tireRotation) {
                    tireRotation.updateAttributes({
                        tireRotationName: req.body.tireRotationName
                    }).then(function () {
                        res.send(responseService.generateResponse(tireRotation, 200, {message:"Tire Rotation updated", level:"I"}));
                    }).catch(function (error) {
                        res.send(responseService.generateResponse(error, 500, {message:"Tire Rotation could not be updated", level:"E"}));
                    })
                }else{
                    res.send(responseService.generateResponse(tireRotation, 404, {message: "Tire Rotation not found", level:"E"}));
                }
            }).catch(function (error) {
                res.send(responseService.generateResponse(error, 500, {message:"Tire Rotation could not be updated", level:"E"}));
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    getAllOtherEntries: function(req, res, next) {
        return models.sequelize.transaction(function (t) {
            models.OtherEntry.findAll()
            .then(function(OtherEntries) {
                res.send(responseService.generateResponse(OtherEntries, 200, {}));
            })
            .catch(function (error){
                console.log(error);
                res.send(responseService.generateResponse(error, 500, {message:"Unable to load other entries", level:"E"}));
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    getOneOtherEntry: function(req, res, next) {
        return models.sequelize.transaction(function (t) {
            models.OtherEntry.findById(req.params.id)
            .then(function (OtherEntry) {
                res.send(responseService.generateResponse(OtherEntry, 200, {}));
            })
            .catch(function (error){
                res.send(responseService.generateResponse(error, 404, {message:"Other Entry not found", level:"E"}));
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    createOtherEntry: function (req, res, next) {
        return models.sequelize.transaction(function (t) {
            models.OtherEntry.create(req.body)
            .then(function (newOtherEntry) {
                res.send(responseService.generateResponse(newOtherEntry, 200, {message:"Other Entry created", level:"I"}));
            })
            .catch(function (error){
                res.send(responseService.generateResponse(error, 500, {message:"Other Entry could not be created", level:"E"}));
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    deleteOtherEntry: function(req, res, next){
        return models.sequelize.transaction(function (t) {
            models.OtherEntry.destroy({where: {id: req.params.id}})
            .then(function (OtherEntry) {
                res.send(responseService.generateResponse(OtherEntry, 200, {message:"Other Entry deleted", level:"I"}));
            })
            .catch(function (error){
                res.send(responseService.generateResponse(error, 500, {message:"Other Entry could not be deleted", level:"E"}));
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    },
    editOtherEntry: function(req, res, next) {
        return models.sequelize.transaction(function (t) {
            models.OtherEntry.find({ where: { id: req.params.id } })
            .then(function(OtherEntry) {
                if (OtherEntry) {
                    OtherEntry.updateAttributes({
                        OtherEntryName: req.body.OtherEntryName
                    }).then(function () {
                        res.send(responseService.generateResponse(OtherEntry, 200, {message:"Other Entry updated", level:"I"}));
                    }).catch(function (error) {
                        res.send(responseService.generateResponse(error, 500, {message:"Other Entry could not be updated", level:"E"}));
                    })
                }else{
                    res.send(responseService.generateResponse(OtherEntry, 404, {message: "Other Entry not found", level:"E"}));
                }
            }).catch(function (error) {
                res.send(responseService.generateResponse(error, 500, {message:"Other Entry could not be updated", level:"E"}));
            });
        })
        .then(function(result){

        })
        .catch(function(err){
            throw new Error();
        });
    }
}
