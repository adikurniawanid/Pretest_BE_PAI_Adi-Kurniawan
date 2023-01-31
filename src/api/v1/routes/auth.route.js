"use strict";
const express = require("express");
const router = express.Router();
const { UserController } = require("../controllers");
const { registerValidationRules } = require("../validations/user.validation");
const { validation } = require("../middlewares");

router.post(
  "/register",
  registerValidationRules(),
  validation,
  UserController.register
);

module.exports = router;
