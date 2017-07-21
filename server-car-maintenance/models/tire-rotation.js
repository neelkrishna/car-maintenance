
'use strict';

module.exports = function(sequelize, DataTypes) {
    var TireRotation = sequelize.define('TireRotation', {
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        mileage: DataTypes.FLOAT,
        mileageNextDue: DataTypes.FLOAT,
        cost: DataTypes.FLOAT,
        notes: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                TireRotation.belongsTo(models.Car, {through: 'CarTireRotation'});
            }
        }
    });

    return TireRotation;
};
