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

  static async update(req, res, next) {
    try {
      const { plant, amount, locationId, conditionId } = req.body;
      const { id } = req.params;

      const farm = await Farm.findOne({
        where: {
          id,
          userId: req.user.id,
        },
      });

      if (!farm) {
        throw {
          status: 404,
          message: "Farm Not Found",
        };
      }

      await Farm.update(
        { plant, amount, locationId, conditionId },
        { where: { id, userId: req.user.id } }
      );

      res.status(200).json({
        message: "Farm updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const farm = await Farm.findOne({
        where: {
          id,
          userId: req.user.id,
        },
      });

      if (!farm) {
        throw {
          status: 404,
          message: "Farm Not Found",
        };
      }

      await Farm.destroy({ where: { id, userId: req.user.id } });

      res.status(200).json({
        message: "Farm deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
};
