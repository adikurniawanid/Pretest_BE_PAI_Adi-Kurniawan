"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Location.init(
    {
      province: DataTypes.STRING,
      city: DataTypes.STRING,
      district: DataTypes.STRING,
      lat: DataTypes.DOUBLE,
      lon: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Location",
      timestamps: false,
    }
  );
  return Location;
};
