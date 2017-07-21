
'use strict';

module.exports = function(sequelize, DataTypes) {
    var OilChange = sequelize.define('OilChange', {
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
                OilChange.belongsTo(models.Car, {through: 'CarOilChange'});
            }
        }
    });

    return OilChange;
};
