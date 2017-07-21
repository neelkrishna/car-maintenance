
'use strict';

module.exports = function(sequelize, DataTypes) {
    var Car = sequelize.define('Car', {
        make: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 20],
                    msg: 'Please enter a make between (1) and (20) characters long!'
                }
            }
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 20],
                    msg: 'Please enter a model between (1) and (20) characters long!'
                }
            }
        },
        year: DataTypes.INTEGER,
        miles: DataTypes.FLOAT,
        notes: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Car.belongsToMany(models.OilChange, {through: 'CarOilChange',  foreignKey: "carId"});
                Car.belongsToMany(models.TireRotation, {through: 'CarTireRotation', foreignKey: "carId"});
                Car.belongsToMany(models.Purchase, {through: 'CarPurchase', foreignKey: "carId"});
                Car.belongsToMany(models.OtherEntry, {through: 'CarOtherEntry', foreignKey: "carId"});
            }
        }
    });

    return Car;
};
