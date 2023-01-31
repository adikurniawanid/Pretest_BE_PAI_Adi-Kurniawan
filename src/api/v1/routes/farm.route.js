"use strict";
const express = require("express");
const router = express.Router();
const { FarmController } = require("../controllers");
const { authorization } = require("../middlewares");
const { createFarmValidationRules } = require("../validations/farm.validation");
const { validation } = require("../middlewares");

router.post(
  "/",
  authorization,
  createFarmValidationRules(),
  validation,
  FarmController.create
);

module.exports = router;
