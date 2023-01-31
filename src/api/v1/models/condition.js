"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Condition extends Model {
    static associate(models) {
      // define association here
    }
  }
  Condition.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Condition",
      timestamps: false,
    }
  );
  return Condition;
};
