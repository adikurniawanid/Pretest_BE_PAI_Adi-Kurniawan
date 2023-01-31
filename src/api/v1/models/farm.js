"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Farm extends Model {
    static associate(models) {
      Farm.belongsTo(models.Location, {
        foreignKey: "locationId",
      });

      Farm.belongsTo(models.Condition, {
        foreignKey: "conditionId",
      });

      Farm.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Farm.init(
    {
      publicId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      plant: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      locationId: DataTypes.INTEGER,
      conditionId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Farm",
    }
  );
  return Farm;
};
