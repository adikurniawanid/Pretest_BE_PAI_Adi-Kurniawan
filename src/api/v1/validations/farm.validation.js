"use strict";
const { body } = require("express-validator");
const { Condition, Location } = require("../models");

const createFarmValidationRules = () => {
  return [
    body("plant").notEmpty().withMessage("Plant is required"),
    body("amount")
      .notEmpty()
      .withMessage("amount is required")
      .bail()
      .isNumeric()
      .withMessage("amount must be numeric"),
    body("locationId")
      .notEmpty()
      .withMessage("location id is required")
      .bail()
      .isNumeric()
      .withMessage("location id must be numeric")
      .custom(async (locationId) => {
        if (
          !(await Location.findOne({
            where: {
              id: locationId,
            },
          }))
        ) {
          return Promise.reject("Location not valid");
        }
      }),
    body("conditionId")
      .notEmpty()
      .withMessage("condition id is required")
      .bail()
      .isNumeric()
      .withMessage("condition id must be numeric")
      .custom(async (conditionId) => {
        if (
          !(await Condition.findOne({
            where: {
              id: conditionId,
            },
          }))
        ) {
          return Promise.reject("Condition not valid");
        }
      }),
  ];
};

const updateFarmValidationRules = () => {
  return [
    body("amount").optional().isNumeric().withMessage("amount must be numeric"),
    body("locationId")
      .optional()
      .isNumeric()
      .withMessage("location id must be numeric")
      .bail()
      .custom(async (locationId) => {
        if (
          !(await Location.findOne({
            where: {
              id: locationId,
            },
          }))
        ) {
          return Promise.reject("Location not valid");
        }
      }),
    body("conditionId")
      .optional()
      .isNumeric()
      .withMessage("condition id must be numeric")
      .bail()
      .custom(async (conditionId) => {
        if (
          !(await Condition.findOne({
            where: {
              id: conditionId,
            },
          }))
        ) {
          return Promise.reject("Condition not valid");
        }
      }),
  ];
};

module.exports = {
  createFarmValidationRules,
  updateFarmValidationRules,
};
