
'use strict';

module.exports = function(sequelize, DataTypes) {
    var Inspection = sequelize.define('Inspection', {
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        mileage: DataTypes.FLOAT,
        dateNextDue: DataTypes.FLOAT,
        cost: DataTypes.FLOAT,
        notes: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Inspection.belongsTo(models.Car, {through: 'CarInspection'});
            }
        }
    });

    return Inspection;
};
