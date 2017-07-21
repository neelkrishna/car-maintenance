
'use strict';

module.exports = function(sequelize, DataTypes) {
    var OtherEntry = sequelize.define('OtherEntry', {
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        description: DataTypes.STRING,
        mileage: DataTypes.FLOAT,
        cost: DataTypes.FLOAT
    }, {
        classMethods: {
            associate: function(models) {
                OtherEntry.belongsTo(models.Car, {through: 'CarOtherEntry'});
            }
        }
    });

    return OtherEntry;
};
