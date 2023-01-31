("use strict");
const crypto = require("crypto");
const { Condition, Farm, Location } = require("../models");
const axios = require("axios");
module.exports = class FarmController {
  static async get(req, res, next) {
    try {
      const { publicId } = req.params;

      const farm = await Farm.findOne({
        include: [{ model: Location }, { model: Condition }],
        where: { userId: req.user.id, publicId },
      });

      const weather = await axios.get(
        `https://ibnux.github.io/BMKG-importer/cuaca/${farm.Location.id}.json`
      );

      if (!farm) {
        return res.status(404).json({
          message: "Farm not found",
        });
      }

      const data = {
        publicId: farm.publicId,
        plant: farm.plant,
        amount: farm.amount,
        location: {
          province: farm.Location.province,
          city: farm.Location.city,
          district: farm.Location.district,
          lat: farm.Location.lat,
          lon: farm.Location.lon,
        },
        weather: weather.data,
        condition: farm.Condition.name,
        createdAt: farm.createdAt,
        updatedAt: farm.updatedAt,
      };

      res.status(200).json({
        message: "Farm retrieved successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async list(req, res, next) {
    try {
      const options = {
        include: [{ model: Location }, { model: Condition }],
        where: { userId: req.user.id },
      };

      if (req.query.conditionId) {
        options.where.conditionId = req.query.conditionId;
      }
      if (req.query.locationId) {
        options.where.locationId = req.query.locationId;
      }

      const farms = await Farm.findAll(options);

      if (!farms.length) {
        return res.status(404).json({
          message: "Farm list not found",
        });
      }

      const data = farms.map((farm) => {
        return {
          publicId: farm.publicId,
          plant: farm.plant,
          amount: farm.amount,
          location: {
            province: farm.Location.province,
            city: farm.Location.city,
            district: farm.Location.district,
            lat: farm.Location.lat,
            lon: farm.Location.lon,
          },
          condition: farm.Condition.name,
          createdAt: farm.createdAt,
          updatedAt: farm.updatedAt,
        };
      });

      res.status(200).json({
        message: "Farm list retrieved successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { plant, amount, locationId, conditionId } = req.body;

      const farm = await Farm.create({
        publicId: crypto.randomUUID(),
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
      const { publicId } = req.params;

      const farm = await Farm.findOne({
        where: {
          publicId,
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
        { where: { publicId, userId: req.user.id } }
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
      const { publicId } = req.params;

      const farm = await Farm.findOne({
        where: {
          publicId,
          userId: req.user.id,
        },
      });

      if (!farm) {
        throw {
          status: 404,
          message: "Farm Not Found",
        };
      }

      await Farm.destroy({ where: { publicId, userId: req.user.id } });

      res.status(200).json({
        message: "Farm deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
};
