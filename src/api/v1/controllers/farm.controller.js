"use strict";
const { Farm } = require("../models");

module.exports = class FarmController {
  static async create(req, res, next) {
    try {
      const { plant, amount, locationId, conditionId } = req.body;

      const farm = await Farm.create({
        plant,
        amount,
        locationId,
        conditionId,
        userId: req.user.id,
      });

      res.status(201).json({
        message: "Farm created successfully",
      });
    } catch (error) {
      next(error);
    }
  }
};
