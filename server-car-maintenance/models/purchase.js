
'use strict';

module.exports = function(sequelize, DataTypes) {
    var Purchase = sequelize.define('Purchase', {
        dateBought: {
            type: DataTypes.DATE,
            allowNull: false
        },
        purchaseType: DataTypes.STRING,
        milesAtPurchase: DataTypes.FLOAT,
        notes: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Purchase.belongsTo(models.Car, {through: 'CarPurchase'});
            }
        }
    });

    return Purchase;
};
