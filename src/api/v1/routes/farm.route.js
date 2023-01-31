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

router.get("/:publicId", authorization, FarmController.get);
router.get("/", authorization, FarmController.list);
router.post(
  "/",
  authorization,
  createFarmValidationRules(),
  validation,
  FarmController.create
);
router.put(
  "/:publicId",
  authorization,
  updateFarmValidationRules(),
  validation,
  FarmController.update
);
router.delete("/:publicId", authorization, FarmController.delete);

module.exports = router;
