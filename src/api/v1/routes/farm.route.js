"use strict";
const express = require("express");
const router = express.Router();
const { FarmController } = require("../controllers");
const { authorization } = require("../middlewares");
const {
  createFarmValidationRules,
  updateFarmValidationRules,
} = require("../validations/farm.validation");
const { validation } = require("../middlewares");

router.post(
  "/",
  authorization,
  createFarmValidationRules(),
  validation,
  FarmController.create
);

router.put(
  "/:id",
  authorization,
  updateFarmValidationRules(),
  validation,
  FarmController.update
);

router.delete("/:id", authorization, FarmController.delete);

module.exports = router;
